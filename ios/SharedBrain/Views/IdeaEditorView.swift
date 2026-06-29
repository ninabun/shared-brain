import PhotosUI
import SwiftUI

struct IdeaEditorView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var idea: Idea
    @State private var selectedPhoto: PhotosPickerItem?
    @State private var categoryText: String

    let onSave: (Idea) async -> Void

    init(idea: Idea, onSave: @escaping (Idea) async -> Void) {
        _idea = State(initialValue: idea)
        _categoryText = State(initialValue: idea.categories.joined(separator: ", "))
        self.onSave = onSave
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Source") {
                    Picker("Type", selection: $idea.source) {
                        ForEach(IdeaSource.allCases) { source in
                            Text(source.label).tag(source.rawValue)
                        }
                    }
                }

                Section("Content") {
                    TextField("Link", text: $idea.url)
                        .textInputAutocapitalization(.never)
                        .keyboardType(.URL)
                    TextField("Title", text: $idea.title)
                    TextField("Attribution", text: $idea.attribution)
                    TextField("Notes", text: $idea.description, axis: .vertical)
                        .lineLimit(4, reservesSpace: true)
                }

                Section("Organization") {
                    TextField("Categories, comma separated", text: $categoryText)
                    TextField("Film category", text: $idea.filmCategory)
                    TextField("Film date YYYY-MM-DD", text: $idea.filmDate)
                }

                Section("Visual") {
                    PhotosPicker(selection: $selectedPhoto, matching: .images) {
                        Label(idea.uploadUrl.isEmpty ? "Add thumbnail" : "Replace thumbnail", systemImage: "photo")
                    }
                }
            }
            .navigationTitle(idea.id == nil ? "New Idea" : "Edit Idea")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        Task {
                            idea.categories = categoryText
                                .split(separator: ",")
                                .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
                                .filter { !$0.isEmpty }
                            await onSave(idea)
                            dismiss()
                        }
                    }
                }
            }
            .onChange(of: selectedPhoto) { _, item in
                Task {
                    guard let data = try? await item?.loadTransferable(type: Data.self),
                          let uiImage = UIImage(data: data),
                          let dataUrl = ImageTools.jpegDataUrl(from: uiImage) else { return }
                    idea.uploadUrl = dataUrl
                }
            }
        }
    }
}
