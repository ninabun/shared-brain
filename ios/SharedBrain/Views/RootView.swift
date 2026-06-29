import SwiftUI

struct RootView: View {
    @EnvironmentObject private var auth: AuthViewModel

    var body: some View {
        Group {
            if !auth.isReady {
                ProgressView()
            } else if auth.user == nil {
                SignInView()
            } else {
                IdeaListView()
            }
        }
    }
}
