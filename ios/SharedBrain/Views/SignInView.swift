import SwiftUI

struct SignInView: View {
    @EnvironmentObject private var auth: AuthViewModel

    var body: some View {
        ZStack {
            LinearGradient(colors: [Color(red: 0.03, green: 0.07, blue: 0.12), Color(red: 0.04, green: 0.14, blue: 0.2)], startPoint: .topLeading, endPoint: .bottomTrailing)
                .ignoresSafeArea()

            VStack(spacing: 22) {
                Image(systemName: "sparkles")
                    .font(.system(size: 36, weight: .bold))
                    .foregroundStyle(.black)
                    .frame(width: 72, height: 72)
                    .background(.cyan)
                    .clipShape(RoundedRectangle(cornerRadius: 18))

                Text("Shared Brain")
                    .font(.system(size: 44, weight: .black, design: .rounded))
                    .foregroundStyle(.white)

                Text("AI Applications")
                    .font(.headline)
                    .foregroundStyle(.cyan)

                Button {
                    Task { await auth.signInWithGoogle() }
                } label: {
                    Label("Continue with Google", systemImage: "person.crop.circle")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(.cyan)
                        .foregroundStyle(.black)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }

                if let error = auth.accessError {
                    Text(error)
                        .font(.footnote)
                        .foregroundStyle(.red)
                        .multilineTextAlignment(.center)
                }
            }
            .padding(28)
        }
    }
}
