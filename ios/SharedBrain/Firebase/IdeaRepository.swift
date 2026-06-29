import FirebaseAuth
import FirebaseFirestore
import FirebaseFirestoreSwift
import Foundation

@MainActor
final class IdeaRepository: ObservableObject {
    @Published var ideas: [Idea] = []
    @Published var errorMessage: String?

    private let db = Firestore.firestore()
    private var listener: ListenerRegistration?

    private var ideasRef: CollectionReference {
        db.collection("workspaces").document("main").collection("ideas")
    }

    func start() {
        listener?.remove()
        listener = ideasRef
            .order(by: "createdAt", descending: true)
            .addSnapshotListener { [weak self] snapshot, error in
                guard let self else { return }
                if let error {
                    Task { @MainActor in self.errorMessage = error.localizedDescription }
                    return
                }
                let ideas = snapshot?.documents.compactMap { document in
                    try? document.data(as: Idea.self)
                } ?? []
                Task { @MainActor in self.ideas = ideas }
            }
    }

    func stop() {
        listener?.remove()
        listener = nil
    }

    func save(_ idea: Idea) async {
        do {
            var payload = try Firestore.Encoder().encode(idea)
            payload["updatedAt"] = FieldValue.serverTimestamp()
            if let id = idea.id, !id.isEmpty {
                try await ideasRef.document(id).setData(payload, merge: true)
            } else {
                payload["createdAt"] = FieldValue.serverTimestamp()
                payload["createdBy"] = Auth.auth().currentUser?.uid ?? ""
                _ = try await ideasRef.addDocument(data: payload)
            }
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func delete(_ idea: Idea) async {
        guard let id = idea.id else { return }
        do {
            try await ideasRef.document(id).delete()
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}
