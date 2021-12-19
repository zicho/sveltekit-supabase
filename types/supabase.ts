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
  /** Private messages sent between users */
  private_messages: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    created_at?: string;
    from?: string;
    to?: string;
    title?: string;
    content?: string;
  };
  profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    updated_at?: string;
    username?: string;
    avatar_url?: string;
    website?: string;
    /** A brief description of the user which can be edited by the owner and viewed by others */
    description?: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** private_messages */
  "body.private_messages": definitions["private_messages"];
  "rowFilter.private_messages.id": string;
  "rowFilter.private_messages.created_at": string;
  "rowFilter.private_messages.from": string;
  "rowFilter.private_messages.to": string;
  "rowFilter.private_messages.title": string;
  "rowFilter.private_messages.content": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.id": string;
  "rowFilter.profiles.updated_at": string;
  "rowFilter.profiles.username": string;
  "rowFilter.profiles.avatar_url": string;
  "rowFilter.profiles.website": string;
  /** A brief description of the user which can be edited by the owner and viewed by others */
  "rowFilter.profiles.description": string;
}

export interface operations {}

export interface external {}
