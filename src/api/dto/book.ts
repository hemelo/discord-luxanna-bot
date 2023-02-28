export type Book = {
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        industryIdentifiers: {
            type: string;
            identifier: string;
        }[];
        readingModes: {
            text: boolean,
            image: boolean,
        },
        pageCount: number;
        printType: string;
        categories: string[];
        maturityRating?: "NOT_MATURE" | "MATURE" | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED";
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        },
        allowAnonLogging: boolean; 
        contentVersion: string;
        language: string;
        previewLink: string;
        infoLink: string;
        canonicalVolumeLink: string;
    },
    saleInfo: {
        country: string;
        saleability: string;
        isEbook: boolean;
    },
    accessInfo: {
        country: string,
        viewability: "NO_PAGES" | undefined,
        embeddable: boolean,
        publicDomain: boolean,
        epub: {
            isAvailable: boolean
        },
        pdf: {
            isAvailable: boolean
        },
        webReaderLink: "http://play.google.com/books/reader?id=ROzjGwAACAAJ&hl=&source=gbs_api",
        accessViewStatus: "NONE" | undefined,
    }
}