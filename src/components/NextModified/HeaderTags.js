import Head from "next/head";

export default function HeadTags({ title, description, url, picture }) {
  return (
    <Head>
      <meta charSet="UTF-8" />

      {title ? <title>{title}</title> : null}

      <meta name="description" content={description} />
      <meta
        property="og:title"
        content={title ? title : "Hebertdev movies | Hebertdev.space"}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:description"
        content={description ? description : ""}
      />
      {picture ? (
        <meta property="og:image" content={picture} />
      ) : (
        <meta property="og:image" content="/original.png" />
      )}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta
        property="twitter:title"
        content={title ? title : "Hebertdev movies | Hebertdev.space"}
      />
      <meta
        property="twitter:description"
        content={description ? description : ""}
      />
      {picture ? (
        <meta property="twitter:image" content={picture} />
      ) : (
        <meta property="twitter:image" content="/original.png" />
      )}
    </Head>
  );
}
