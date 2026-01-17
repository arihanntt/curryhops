import { ImageResponse } from "next/og";
import { blogPosts } from "@/data/blogData";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { id: string };
}) {
  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0f0f",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Curry & Hops
      </div>,
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #0f0f0f 100%)",
          color: "white",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#E6B877",
            marginBottom: 24,
          }}
        >
          Curry & Hops
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "90%",
          }}
        >
          {post.title}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#cfcfcf",
          }}
        >
          Indian Bistro • Where Spice Meets Craft
        </div>
      </div>
    ),
    size
  );
}
