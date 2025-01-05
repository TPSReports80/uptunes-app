interface ImageAttributes {
  height: string;
}

interface Image {
  label: string;
  attributes: ImageAttributes;
}

export interface Album {
  favorite?: boolean;
  category: {
    attributes: {
      id: string;
      label: string;
      scheme: string;
      term: string;
    };
  };
  id: {
    attributes: {
      id: string;
    };
    label: string;
  };
  ["im:artist"]: {
    attributes: {
      href: string;
    };
    label: string;
  };
  ["im:contentType"]: {
    attributes: {
      label: string;
      term: string;
    };
    contentType: {
      attributes: {
        label: string;
        term: string;
      };
    };
  };
  ["im:image"]: Image[];
  ["im:itemCount"]: {
    label: string;
  };
  ["im:name"]: {
    label: string;
  };
  ["im:price"]: {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  ["im:releaseDate"]: {
    label: string;
    attributes: {
      label: string;
    };
  };
  link: {
    attributes: {
      href: string;
      rel: string;
      type: string;
    };
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
}

export interface AlbumData {
  artist: string;
  mbid: string;
  tags: {
    tag: {
      url: string;
      name: string;
    }[];
  };
  playcount: string;
  image: {
    size: string;
    "#text": string;
  }[];
  tracks: {
    track: {
      streamable: {
        fulltrack: string;
        "#text": string;
      };
      duration: number;
      url: string;
      name: string;
      "@attr": {
        rank: number;
      };
      artist: {
        url: string;
        name: string;
        mbid: string;
      };
    }[];
  };
  url: string;
  name: string;
  listeners: string;
  wiki: {
    published: string;
    summary: string;
    content: string;
  };
}
