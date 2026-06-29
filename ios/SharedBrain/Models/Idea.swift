import FirebaseFirestore
import Foundation

struct Idea: Identifiable, Codable, Equatable {
    @DocumentID var id: String?
    var url: String
    var source: String
    var title: String
    var description: String
    var attribution: String
    var thumbnailUrl: String
    var uploadUrl: String
    var categories: [String]
    var filmCategory: String
    var filmDate: String
    var createdBy: String
    var createdAt: Timestamp?
    var updatedAt: Timestamp?

    static let empty = Idea(
        url: "",
        source: "note",
        title: "",
        description: "",
        attribution: "",
        thumbnailUrl: "",
        uploadUrl: "",
        categories: [],
        filmCategory: "",
        filmDate: "",
        createdBy: "",
        createdAt: nil,
        updatedAt: nil
    )
}

enum IdeaSource: String, CaseIterable, Identifiable {
    case youtube
    case tweet
    case instagram
    case article
    case note

    var id: String { rawValue }

    var label: String {
        switch self {
        case .youtube: "YouTube"
        case .tweet: "AI Tools"
        case .instagram: "Instagram"
        case .article: "Agentic AI"
        case .note: "Loose ideas"
        }
    }
}
