import type { Schema, Attribute } from '@strapi/strapi';

export interface KeywordsKeywords extends Schema.Component {
  collectionName: 'components_keywords_keywords';
  info: {
    displayName: 'Keywords';
    icon: 'alien';
    description: '';
  };
  attributes: {
    Value: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'keywords.keywords': KeywordsKeywords;
    }
  }
}
