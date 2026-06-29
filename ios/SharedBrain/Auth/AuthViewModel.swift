import FirebaseAuth
import FirebaseCore
import FirebaseFirestore
import Foundation
import GoogleSignIn
import UIKit

@MainActor
final class AuthViewModel: ObservableObject {
    @Published var user: User?
    @Published var isReady = false
    @Published var accessError: String?

    private let db = Firestore.firestore()
    private var listener: AuthStateDidChangeListenerHandle?

    init() {
        listener = Auth.auth().addStateDidChangeListener { [weak self] _, user in
            Task { @MainActor in
                self?.user = user
                self?.isReady = true
                if let user {
                    await self?.saveProfile(user)
                    await self?.checkMembership(user)
                }
            }
        }
    }

    deinit {
        if let listener {
            Auth.auth().removeStateDidChangeListener(listener)
        }
    }

    func signInWithGoogle() async {
        guard let clientID = FirebaseApp.app()?.options.clientID else {
            accessError = "Missing Firebase client ID."
            return
        }

        guard let root = UIApplication.shared.connectedScenes
            .compactMap({ $0 as? UIWindowScene })
            .flatMap({ $0.windows })
            .first(where: { $0.isKeyWindow })?.rootViewController else {
            accessError = "Could not open Google sign-in."
            return
        }

        do {
            GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: clientID)
            let result = try await GIDSignIn.sharedInstance.signIn(withPresenting: root)
            guard let idToken = result.user.idToken?.tokenString else {
                accessError = "Google did not return an ID token."
                return
            }
            let credential = GoogleAuthProvider.credential(
                withIDToken: idToken,
                accessToken: result.user.accessToken.tokenString
            )
            _ = try await Auth.auth().signIn(with: credential)
        } catch {
            accessError = error.localizedDescription
        }
    }

    func signOut() {
        do {
            try Auth.auth().signOut()
            GIDSignIn.sharedInstance.signOut()
            user = nil
        } catch {
            accessError = error.localizedDescription
        }
    }

    private func saveProfile(_ user: User) async {
        do {
            try await db.collection("profiles").document(user.uid).setData([
                "displayName": user.displayName ?? "",
                "email": user.email ?? "",
                "photoURL": user.photoURL?.absoluteString ?? "",
                "lastSeenAt": FieldValue.serverTimestamp()
            ], merge: true)
        } catch {
            accessError = error.localizedDescription
        }
    }

    private func checkMembership(_ user: User) async {
        do {
            let doc = try await db
                .collection("workspaces")
                .document("main")
                .collection("members")
                .document(user.uid)
                .getDocument()
            accessError = doc.exists ? nil : "Workspace access needed for \(user.email ?? user.uid)."
        } catch {
            accessError = error.localizedDescription
        }
    }
}
