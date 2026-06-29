import SwiftUI
import UIKit

struct IdeaCardView: View {
    let idea: Idea

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if let image = imageFromDataUrl(idea.uploadUrl) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
                    .frame(maxHeight: 260)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
            } else {
                CyberPlaceholder(source: idea.source)
            }

            Text(label(for: idea.source))
                .font(.caption)
                .fontWeight(.black)
                .foregroundStyle(.cyan)
                .textCase(.uppercase)

            Text(idea.title.isEmpty ? "Untitled" : idea.title)
                .font(.title3)
                .fontWeight(.bold)
                .foregroundStyle(.white)

            if !idea.description.isEmpty {
                Text(idea.description)
                    .foregroundStyle(.white.opacity(0.72))
            }

            if !idea.attribution.isEmpty {
                Text(idea.attribution)
                    .font(.footnote)
                    .foregroundStyle(.white.opacity(0.55))
            }
        }
        .padding()
        .background(
            LinearGradient(colors: [Color.white.opacity(0.08), Color.cyan.opacity(0.08)], startPoint: .topLeading, endPoint: .bottomTrailing)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16).stroke(.cyan.opacity(0.22))
        )
        .clipShape(RoundedRectangle(cornerRadius: 16))
    }

    private func label(for source: String) -> String {
        IdeaSource(rawValue: source)?.label ?? source
    }

    private func imageFromDataUrl(_ value: String) -> UIImage? {
        guard value.starts(with: "data:image/"),
              let comma = value.firstIndex(of: ",") else { return nil }
        let base64 = String(value[value.index(after: comma)...])
        guard let data = Data(base64Encoded: base64) else { return nil }
        return UIImage(data: data)
    }
}

private struct CyberPlaceholder: View {
    let source: String

    var body: some View {
        ZStack {
            LinearGradient(colors: [.cyan.opacity(0.24), .purple.opacity(0.18), .black], startPoint: .topLeading, endPoint: .bottomTrailing)
            VStack(spacing: 8) {
                Image(systemName: "sparkles")
                    .font(.largeTitle)
                Text(IdeaSource(rawValue: source)?.label ?? "Reference")
                    .fontWeight(.black)
            }
            .foregroundStyle(.white)
        }
        .frame(height: 180)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}
