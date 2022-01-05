/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/private_messages": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.private_messages.id"];
          created_at?: parameters["rowFilter.private_messages.created_at"];
          from?: parameters["rowFilter.private_messages.from"];
          to?: parameters["rowFilter.private_messages.to"];
          title?: parameters["rowFilter.private_messages.title"];
          content?: parameters["rowFilter.private_messages.content"];
          /** indicates if message has been opened/read */
          isRead?: parameters["rowFilter.private_messages.isRead"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["private_messages"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** private_messages */
          private_messages?: definitions["private_messages"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.private_messages.id"];
          created_at?: parameters["rowFilter.private_messages.created_at"];
          from?: parameters["rowFilter.private_messages.from"];
          to?: parameters["rowFilter.private_messages.to"];
          title?: parameters["rowFilter.private_messages.title"];
          content?: parameters["rowFilter.private_messages.content"];
          /** indicates if message has been opened/read */
          isRead?: parameters["rowFilter.private_messages.isRead"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.private_messages.id"];
          created_at?: parameters["rowFilter.private_messages.created_at"];
          from?: parameters["rowFilter.private_messages.from"];
          to?: parameters["rowFilter.private_messages.to"];
          title?: parameters["rowFilter.private_messages.title"];
          content?: parameters["rowFilter.private_messages.content"];
          /** indicates if message has been opened/read */
          isRead?: parameters["rowFilter.private_messages.isRead"];
        };
        body: {
          /** private_messages */
          private_messages?: definitions["private_messages"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          /** A brief description of the user which can be edited by the owner and viewed by others */
          description?: parameters["rowFilter.profiles.description"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          /** A brief description of the user which can be edited by the owner and viewed by others */
          description?: parameters["rowFilter.profiles.description"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          /** A brief description of the user which can be edited by the owner and viewed by others */
          description?: parameters["rowFilter.profiles.description"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  /** @description Private messages sent between users */
  private_messages: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    from?: string;
    /** Format: character varying */
    to?: string;
    /** Format: character varying */
    title?: string;
    /** Format: character varying */
    content?: string;
    /**
     * Format: boolean
     * @description indicates if message has been opened/read
     */
    isRead: boolean;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    username?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    website?: string;
    /**
     * Format: text
     * @description A brief description of the user which can be edited by the owner and viewed by others
     */
    description?: string;
  };
}

export interface parameters {
  /** @description Preference */
  preferParams: "params=single-object";
  /** @description Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** @description Preference */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description private_messages */
  "body.private_messages": definitions["private_messages"];
  /** Format: bigint */
  "rowFilter.private_messages.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.private_messages.created_at": string;
  /** Format: character varying */
  "rowFilter.private_messages.from": string;
  /** Format: character varying */
  "rowFilter.private_messages.to": string;
  /** Format: character varying */
  "rowFilter.private_messages.title": string;
  /** Format: character varying */
  "rowFilter.private_messages.content": string;
  /**
   * Format: boolean
   * @description indicates if message has been opened/read
   */
  "rowFilter.private_messages.isRead": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.username": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** Format: text */
  "rowFilter.profiles.website": string;
  /**
   * Format: text
   * @description A brief description of the user which can be edited by the owner and viewed by others
   */
  "rowFilter.profiles.description": string;
}

export interface operations {}

export interface external {}
