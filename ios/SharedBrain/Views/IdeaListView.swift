import SwiftUI

struct IdeaListView: View {
    @EnvironmentObject private var auth: AuthViewModel
    @StateObject private var repository = IdeaRepository()
    @State private var search = ""
    @State private var selectedSource = "all"
    @State private var editingIdea: Idea?
    @State private var creating = false

    private var filteredIdeas: [Idea] {
        repository.ideas.filter { idea in
            let sourceMatches = selectedSource == "all" || idea.source == selectedSource
            let text = [idea.title, idea.description, idea.url, idea.attribution, idea.filmCategory, idea.categories.joined(separator: " ")]
                .joined(separator: " ")
                .lowercased()
            return sourceMatches && (search.isEmpty || text.contains(search.lowercased()))
        }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color(red: 0.03, green: 0.07, blue: 0.12).ignoresSafeArea()

                List {
                    if let access = auth.accessError {
                        Section {
                            Text(access)
                                .foregroundStyle(.orange)
                        }
                    }

                    Section {
                        Picker("Source", selection: $selectedSource) {
                            Text("Everything").tag("all")
                            ForEach(IdeaSource.allCases) { source in
                                Text(source.label).tag(source.rawValue)
                            }
                        }
                        .pickerStyle(.segmented)
                    }

                    ForEach(filteredIdeas) { idea in
                        IdeaCardView(idea: idea)
                            .listRowBackground(Color.clear)
                            .onTapGesture {
                                editingIdea = idea
                            }
                    }
                    .onDelete { indexSet in
                        for index in indexSet {
                            Task { await repository.delete(filteredIdeas[index]) }
                        }
                    }
                }
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Shared Brain")
            .searchable(text: $search)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Sign out") {
                        auth.signOut()
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        creating = true
                    } label: {
                        Image(systemName: "plus")
                    }
                }
            }
            .sheet(isPresented: $creating) {
                IdeaEditorView(idea: .empty) { idea in
                    await repository.save(idea)
                }
            }
            .sheet(item: $editingIdea) { idea in
                IdeaEditorView(idea: idea) { updated in
                    await repository.save(updated)
                }
            }
            .onAppear { repository.start() }
            .onDisappear { repository.stop() }
        }
    }
}
