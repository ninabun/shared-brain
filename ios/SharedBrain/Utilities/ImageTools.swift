import SwiftUI
import UIKit

enum ImageTools {
    static func jpegDataUrl(from image: UIImage, maxDimension: CGFloat = 980, quality: CGFloat = 0.78) -> String? {
        let size = image.size
        let scale = min(1, maxDimension / max(size.width, size.height))
        let target = CGSize(width: size.width * scale, height: size.height * scale)

        let renderer = UIGraphicsImageRenderer(size: target)
        let resized = renderer.image { _ in
            image.draw(in: CGRect(origin: .zero, size: target))
        }

        guard let data = resized.jpegData(compressionQuality: quality) else {
            return nil
        }
        return "data:image/jpeg;base64,\(data.base64EncodedString())"
    }
}
