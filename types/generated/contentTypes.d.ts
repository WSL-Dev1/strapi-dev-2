import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAtmsTvCategoryAtmsTvCategory extends Schema.CollectionType {
  collectionName: 'atms_tv_categories';
  info: {
    singularName: 'atms-tv-category';
    pluralName: 'atms-tv-categories';
    displayName: 'ATMS TV Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Video_Category_Name: Attribute.String &
      Attribute.Required &
      Attribute.Unique;
    Sort_Order: Attribute.Integer & Attribute.Required & Attribute.Unique;
    Slug: Attribute.UID & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::atms-tv-category.atms-tv-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::atms-tv-category.atms-tv-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAtmsTvPostAtmsTvPost extends Schema.CollectionType {
  collectionName: 'atms_tv_posts';
  info: {
    singularName: 'atms-tv-post';
    pluralName: 'atms-tv-posts';
    displayName: 'ATMS TV Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Video_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Video_Thumbnail: Attribute.Media & Attribute.Required;
    atms_tv_category: Attribute.Relation<
      'api::atms-tv-post.atms-tv-post',
      'oneToOne',
      'api::atms-tv-category.atms-tv-category'
    >;
    Published_Date: Attribute.DateTime & Attribute.Required;
    Video_Duration_Minutes: Attribute.Integer;
    Youtube_URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Variant_ID: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Slug: Attribute.UID & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::atms-tv-post.atms-tv-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::atms-tv-post.atms-tv-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuthorAuthor extends Schema.CollectionType {
  collectionName: 'authors';
  info: {
    singularName: 'author';
    pluralName: 'authors';
    displayName: 'Author';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    First_Name: Attribute.String & Attribute.Required;
    Introduction: Attribute.Text;
    Introduction_Short: Attribute.Text;
    Profile_Image: Attribute.Media & Attribute.Required;
    Email_Address: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Country: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Mailchimp_List_Id: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Follower_Seed: Attribute.BigInteger & Attribute.Required;
    Class_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Font_Colour: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Background_Colour: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Slug: Attribute.UID;
    City: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::author.author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        minLength: 64;
        maxLength: 256;
      }>;
    Hidden: Attribute.Boolean & Attribute.Required;
    Slug: Attribute.UID;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmCategoryLinksEdmCategoryLinks
  extends Schema.CollectionType {
  collectionName: 'edm_category_linkss';
  info: {
    singularName: 'edm-category-links';
    pluralName: 'edm-category-linkss';
    displayName: 'EDM Category Links';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category_Text_Line_One: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Category_Text_Line_Two: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Button_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Target_URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    vip_edm: Attribute.Relation<
      'api::edm-category-links.edm-category-links',
      'manyToOne',
      'api::vip-edm.vip-edm'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-category-links.edm-category-links',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-category-links.edm-category-links',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmHeroImageEdmHeroImage extends Schema.CollectionType {
  collectionName: 'edm_hero_images';
  info: {
    singularName: 'edm-hero-image';
    pluralName: 'edm-hero-images';
    displayName: 'EDM Hero Image';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Image_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Hero_Image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-hero-image.edm-hero-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-hero-image.edm-hero-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmProductReelEdmProductReel extends Schema.CollectionType {
  collectionName: 'edm_product_reels';
  info: {
    singularName: 'edm-product-reel';
    pluralName: 'edm-product-reels';
    displayName: 'EDM Product Reel';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Reel_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Reel_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Variant_List: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    vip_edm: Attribute.Relation<
      'api::edm-product-reel.edm-product-reel',
      'manyToOne',
      'api::vip-edm.vip-edm'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-product-reel.edm-product-reel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-product-reel.edm-product-reel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmProductSpotlightEdmProductSpotlight
  extends Schema.CollectionType {
  collectionName: 'edm_product_spotlights';
  info: {
    singularName: 'edm-product-spotlight';
    pluralName: 'edm-product-spotlights';
    displayName: 'EDM Product Spotlight';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Spotlight_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Variant_Id: Attribute.BigInteger & Attribute.Required;
    edm_product_spotlight_background: Attribute.Relation<
      'api::edm-product-spotlight.edm-product-spotlight',
      'oneToOne',
      'api::edm-product-spotlight-backgrounds.edm-product-spotlight-backgrounds'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-product-spotlight.edm-product-spotlight',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-product-spotlight.edm-product-spotlight',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmProductSpotlightBackgroundsEdmProductSpotlightBackgrounds
  extends Schema.CollectionType {
  collectionName: 'edm_product_spotlight_backgroundss';
  info: {
    singularName: 'edm-product-spotlight-backgrounds';
    pluralName: 'edm-product-spotlight-backgroundss';
    displayName: 'EDM Product Spotlight Backgrounds';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Image: Attribute.Media & Attribute.Required;
    edm_product_spotlight: Attribute.Relation<
      'api::edm-product-spotlight-backgrounds.edm-product-spotlight-backgrounds',
      'oneToOne',
      'api::edm-product-spotlight.edm-product-spotlight'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-product-spotlight-backgrounds.edm-product-spotlight-backgrounds',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-product-spotlight-backgrounds.edm-product-spotlight-backgrounds',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmSlimPromotionBannerEdmSlimPromotionBanner
  extends Schema.CollectionType {
  collectionName: 'edm_slim_promotion_banners';
  info: {
    singularName: 'edm-slim-promotion-banner';
    pluralName: 'edm-slim-promotion-banners';
    displayName: 'EDM Slim Promotion Banner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    EDM_Slim_Promotion_Banner_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Image_Desktop: Attribute.Media & Attribute.Required;
    Image_Mobile: Attribute.Media & Attribute.Required;
    Optional_Hyperlink: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    vip_edm: Attribute.Relation<
      'api::edm-slim-promotion-banner.edm-slim-promotion-banner',
      'manyToOne',
      'api::vip-edm.vip-edm'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-slim-promotion-banner.edm-slim-promotion-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-slim-promotion-banner.edm-slim-promotion-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEdmVoucherOfferEdmVoucherOffer
  extends Schema.CollectionType {
  collectionName: 'edm_voucher_offers';
  info: {
    singularName: 'edm-voucher-offer';
    pluralName: 'edm-voucher-offers';
    displayName: 'EDM Voucher Offer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Voucher_Offer_Line_1: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Voucher_Offer_Line_2: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Voucher_Code: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::edm-voucher-offer.edm-voucher-offer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::edm-voucher-offer.edm-voucher-offer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    FAQ_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    faq_group: Attribute.Relation<
      'api::faq.faq',
      'oneToOne',
      'api::faq-group.faq-group'
    >;
    FAQ_Question: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    FAQ_Answer: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50000;
      }>;
    locations: Attribute.Relation<
      'api::faq.faq',
      'manyToMany',
      'api::location.location'
    >;
    Intent: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sort_Order: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFaqGroupFaqGroup extends Schema.CollectionType {
  collectionName: 'faq_groups';
  info: {
    singularName: 'faq-group';
    pluralName: 'faq-groups';
    displayName: 'FAQ Group';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    FAQ_Group_Section: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    faq: Attribute.Relation<
      'api::faq-group.faq-group',
      'oneToOne',
      'api::faq.faq'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::faq-group.faq-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::faq-group.faq-group',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomepageNewsMediaHomepageNewsMedia
  extends Schema.CollectionType {
  collectionName: 'homepage_news_medias';
  info: {
    singularName: 'homepage-news-media';
    pluralName: 'homepage-news-medias';
    displayName: 'Homepage News / Media';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Short_Synopsis: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Content: Attribute.Text & Attribute.Required;
    Main_Image: Attribute.Media & Attribute.Required;
    Extra_Images: Attribute.Media;
    Published_Datetime: Attribute.DateTime;
    tags: Attribute.Relation<
      'api::homepage-news-media.homepage-news-media',
      'manyToMany',
      'api::tag.tag'
    >;
    author: Attribute.Relation<
      'api::homepage-news-media.homepage-news-media',
      'oneToOne',
      'api::author.author'
    >;
    locations: Attribute.Relation<
      'api::homepage-news-media.homepage-news-media',
      'manyToMany',
      'api::location.location'
    >;
    Slug: Attribute.UID & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::homepage-news-media.homepage-news-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::homepage-news-media.homepage-news-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKeywordKeyword extends Schema.CollectionType {
  collectionName: 'keywords';
  info: {
    singularName: 'keyword';
    pluralName: 'keywords';
    displayName: 'Keyword';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Keyword_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::keyword.keyword',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::keyword.keyword',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationLocation extends Schema.CollectionType {
  collectionName: 'locations';
  info: {
    singularName: 'location';
    pluralName: 'locations';
    displayName: 'Location';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Location_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Location_Id: Attribute.Integer & Attribute.Required;
    faqs: Attribute.Relation<
      'api::location.location',
      'manyToMany',
      'api::faq.faq'
    >;
    homepage_news_medias: Attribute.Relation<
      'api::location.location',
      'manyToMany',
      'api::homepage-news-media.homepage-news-media'
    >;
    question_and_answer: Attribute.Relation<
      'api::location.location',
      'manyToOne',
      'api::question-and-answer.question-and-answer'
    >;
    tv_category: Attribute.Relation<
      'api::location.location',
      'manyToOne',
      'api::tv-category.tv-category'
    >;
    tv_product_link: Attribute.Relation<
      'api::location.location',
      'manyToOne',
      'api::tv-product-link.tv-product-link'
    >;
    tv_explain_link: Attribute.Relation<
      'api::location.location',
      'manyToOne',
      'api::tv-explain-link.tv-explain-link'
    >;
    tv_video: Attribute.Relation<
      'api::location.location',
      'manyToOne',
      'api::tv-video.tv-video'
    >;
    posts: Attribute.Relation<
      'api::location.location',
      'manyToMany',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location.location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::location.location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMcpSeoMcpSeo extends Schema.CollectionType {
  collectionName: 'mcp_seos';
  info: {
    singularName: 'mcp-seo';
    pluralName: 'mcp-seos';
    displayName: 'MCP SEO';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Master_Category: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Slug: Attribute.UID & Attribute.Required;
    Content: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mcp-seo.mcp-seo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mcp-seo.mcp-seo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewTagNewTag extends Schema.CollectionType {
  collectionName: 'new_tags';
  info: {
    singularName: 'new-tag';
    pluralName: 'new-tags';
    displayName: 'New Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Tag_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 64;
        maxLength: 128;
      }>;
    Slug: Attribute.UID & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::new-tag.new-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::new-tag.new-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPodcastPodcast extends Schema.CollectionType {
  collectionName: 'podcasts';
  info: {
    singularName: 'podcast';
    pluralName: 'podcasts';
    displayName: 'Podcast';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Website_Description: Attribute.Text & Attribute.Required;
    Description: Attribute.Text & Attribute.Required;
    Link: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Image: Attribute.Media & Attribute.Required;
    Author: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Copyright: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Language: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    iTunes_author: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    iTunes_Type: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    podcast_owner: Attribute.Relation<
      'api::podcast.podcast',
      'oneToOne',
      'api::podcast-owner.podcast-owner'
    >;
    Itunes_Explicit: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Itunes_Category_Text_1: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Itunes_Category_Text_2: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Itunes_Image: Attribute.Media & Attribute.Required;
    Last_Build_Date: Attribute.DateTime & Attribute.Required;
    Next_Podcast: Attribute.DateTime & Attribute.Required;
    Next_Podcast_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Recent_Episodes_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Postcast_Presenters_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    All_Episodes_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::podcast.podcast',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::podcast.podcast',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPodcastAuthorPodcastAuthor extends Schema.CollectionType {
  collectionName: 'podcast_authors';
  info: {
    singularName: 'podcast-author';
    pluralName: 'podcast-authors';
    displayName: 'Podcast Author';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Author_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Author_Description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Author_Image: Attribute.Media & Attribute.Required;
    Author_Visible: Attribute.Boolean & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::podcast-author.podcast-author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::podcast-author.podcast-author',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPodcastItemPodcastItem extends Schema.CollectionType {
  collectionName: 'podcast_items';
  info: {
    singularName: 'podcast-item';
    pluralName: 'podcast-items';
    displayName: 'Podcast Item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Website_Description: Attribute.Text & Attribute.Required;
    Description: Attribute.Text & Attribute.Required;
    Link: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    pubDate: Attribute.DateTime & Attribute.Required;
    Sound_file_mp3: Attribute.Media & Attribute.Required;
    iteunsexplicit: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    itunesduration: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    itunesimage: Attribute.Media & Attribute.Required;
    itunesseason: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    itunesepisode: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    iteunsepisodetype: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Keywords: Attribute.Component<'keywords.keywords', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::podcast-item.podcast-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::podcast-item.podcast-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPodcastOwnerPodcastOwner extends Schema.CollectionType {
  collectionName: 'podcast_owners';
  info: {
    singularName: 'podcast-owner';
    pluralName: 'podcast-owners';
    displayName: 'Podcast Owner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Email: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::podcast-owner.podcast-owner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::podcast-owner.podcast-owner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 20;
        maxLength: 110;
      }>;
    Short_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 20;
        maxLength: 80;
      }>;
    Intro_Blurb: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Featured_Image: Attribute.Media & Attribute.Required;
    author: Attribute.Relation<
      'api::post.post',
      'oneToOne',
      'api::author.author'
    >;
    locations: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'api::location.location'
    >;
    Body: Attribute.Text & Attribute.Required;
    Word_Count: Attribute.BigInteger & Attribute.Required;
    Date: Attribute.Date & Attribute.Required;
    Published_date: Attribute.DateTime & Attribute.Required;
    Views: Attribute.BigInteger & Attribute.Required;
    Slug: Attribute.UID;
    category: Attribute.Relation<
      'api::post.post',
      'oneToOne',
      'api::category.category'
    >;
    new_tag: Attribute.Relation<
      'api::post.post',
      'oneToOne',
      'api::new-tag.new-tag'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiQuestionAndAnswerQuestionAndAnswer
  extends Schema.CollectionType {
  collectionName: 'question_and_answers';
  info: {
    singularName: 'question-and-answer';
    pluralName: 'question-and-answers';
    displayName: 'Question and Answer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Question: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Answer: Attribute.Text & Attribute.Required;
    keyword: Attribute.Relation<
      'api::question-and-answer.question-and-answer',
      'oneToOne',
      'api::keyword.keyword'
    >;
    Has_Link: Attribute.Boolean & Attribute.Required;
    Link_URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Link_Text: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    locations: Attribute.Relation<
      'api::question-and-answer.question-and-answer',
      'oneToMany',
      'api::location.location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question-and-answer.question-and-answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::question-and-answer.question-and-answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSexSurveyPageSexSurveyPage extends Schema.CollectionType {
  collectionName: 'sex_survey_pages';
  info: {
    singularName: 'sex-survey-page';
    pluralName: 'sex-survey-pages';
    displayName: 'Sex Survey Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    sex_survey_template_1s: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToMany',
      'api::sex-survey-template-1.sex-survey-template-1'
    >;
    sex_survey_template_2s: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToMany',
      'api::sex-survey-template-2.sex-survey-template-2'
    >;
    sex_survey_template_3s: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToMany',
      'api::sex-survey-template-3.sex-survey-template-3'
    >;
    sex_survey_template_4s: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToMany',
      'api::sex-survey-template-4.sex-survey-template-4'
    >;
    sex_survey_template_5s: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToMany',
      'api::sex-survey-template-5.sex-survey-template-5'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sex-survey-page.sex-survey-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSexSurveyTemplate1SexSurveyTemplate1
  extends Schema.CollectionType {
  collectionName: 'sex_survey_template_1s';
  info: {
    singularName: 'sex-survey-template-1';
    pluralName: 'sex-survey-template-1s';
    displayName: 'Sex Survey Template 1';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Headline: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sex_Survey_Category: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Line_1_Text_1: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50000;
      }>;
    Line_1_Text_2: Attribute.Text & Attribute.Required;
    Line_1_Image_1: Attribute.Media & Attribute.Required;
    Line_2_Image_1: Attribute.Media & Attribute.Required;
    Line_2_Text_1: Attribute.Text & Attribute.Required;
    Line_2_Text_2: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sex-survey-template-1.sex-survey-template-1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sex-survey-template-1.sex-survey-template-1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSexSurveyTemplate2SexSurveyTemplate2
  extends Schema.CollectionType {
  collectionName: 'sex_survey_template_2s';
  info: {
    singularName: 'sex-survey-template-2';
    pluralName: 'sex-survey-template-2s';
    displayName: 'Sex Survey Template 2';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Headline: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sex_Survey_Category: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Line_1_Text_1: Attribute.Text & Attribute.Required;
    Line_1_Image_1: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sex-survey-template-2.sex-survey-template-2',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sex-survey-template-2.sex-survey-template-2',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSexSurveyTemplate3SexSurveyTemplate3
  extends Schema.CollectionType {
  collectionName: 'sex_survey_template_3s';
  info: {
    singularName: 'sex-survey-template-3';
    pluralName: 'sex-survey-template-3s';
    displayName: 'Sex Survey Template 3';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Headline: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sex_Survey_Category: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Line_1_Image_1: Attribute.Media & Attribute.Required;
    Line_2_Image_1: Attribute.Media & Attribute.Required;
    Line_2_Text_1: Attribute.Text & Attribute.Required;
    Line_2_Text_2: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sex-survey-template-3.sex-survey-template-3',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sex-survey-template-3.sex-survey-template-3',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSexSurveyTemplate4SexSurveyTemplate4
  extends Schema.CollectionType {
  collectionName: 'sex_survey_template_4s';
  info: {
    singularName: 'sex-survey-template-4';
    pluralName: 'sex-survey-template-4s';
    displayName: 'Sex Survey Template 4';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Headline: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sex_Survey_Category: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Line_1_Text_1: Attribute.Text & Attribute.Required;
    Line_1_Text_2: Attribute.Text & Attribute.Required;
    Line_1_Image_1: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sex-survey-template-4.sex-survey-template-4',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sex-survey-template-4.sex-survey-template-4',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSexSurveyTemplate5SexSurveyTemplate5
  extends Schema.CollectionType {
  collectionName: 'sex_survey_template_5s';
  info: {
    singularName: 'sex-survey-template-5';
    pluralName: 'sex-survey-template-5s';
    displayName: 'Sex Survey Template 5';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Headline: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sex_Survey_Category: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Line_1_Image_1: Attribute.Media & Attribute.Required;
    Line_1_Text_1: Attribute.Text & Attribute.Required;
    Line_1_Text_2: Attribute.Text & Attribute.Required;
    Line_2_Text_1: Attribute.Text & Attribute.Required;
    Line_2_Image_1: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sex-survey-template-5.sex-survey-template-5',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sex-survey-template-5.sex-survey-template-5',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffReviewStaffReview extends Schema.CollectionType {
  collectionName: 'staff_reviews';
  info: {
    singularName: 'staff-review';
    pluralName: 'staff-reviews';
    displayName: 'Staff Review';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Review_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Variant_ID: Attribute.BigInteger & Attribute.Required;
    Quality_Rating: Attribute.Integer & Attribute.Required;
    Value_Rating: Attribute.Integer & Attribute.Required;
    Satisfaction_Rating: Attribute.Integer & Attribute.Required;
    Overall_Rating: Attribute.Integer & Attribute.Required;
    Review_Short_Synopsis: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Review_Long: Attribute.Text & Attribute.Required;
    Featured_Image: Attribute.Media & Attribute.Required;
    author: Attribute.Relation<
      'api::staff-review.staff-review',
      'oneToOne',
      'api::author.author'
    >;
    Published_Date: Attribute.DateTime & Attribute.Required;
    Live: Attribute.Boolean & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staff-review.staff-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staff-review.staff-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Tag_Name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    homepage_news_medias: Attribute.Relation<
      'api::tag.tag',
      'manyToMany',
      'api::homepage-news-media.homepage-news-media'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTvArticleTvArticle extends Schema.CollectionType {
  collectionName: 'tv_articles';
  info: {
    singularName: 'tv-article';
    pluralName: 'tv-articles';
    displayName: 'TV Article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    author: Attribute.Relation<
      'api::tv-article.tv-article',
      'oneToOne',
      'api::author.author'
    >;
    Publish_Date: Attribute.DateTime;
    Body_Content: Attribute.Text & Attribute.Required;
    tv_video: Attribute.Relation<
      'api::tv-article.tv-article',
      'oneToOne',
      'api::tv-video.tv-video'
    >;
    location: Attribute.Relation<
      'api::tv-article.tv-article',
      'oneToOne',
      'api::location.location'
    >;
    URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Blockquote_One: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Blockquote_Two: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    tv_category: Attribute.Relation<
      'api::tv-article.tv-article',
      'oneToOne',
      'api::tv-category.tv-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tv-article.tv-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tv-article.tv-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTvCategoryTvCategory extends Schema.CollectionType {
  collectionName: 'tv_categories';
  info: {
    singularName: 'tv-category';
    pluralName: 'tv-categories';
    displayName: 'TV Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Status: Attribute.Boolean & Attribute.Required;
    Description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Sub_Description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    locations: Attribute.Relation<
      'api::tv-category.tv-category',
      'oneToMany',
      'api::location.location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tv-category.tv-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tv-category.tv-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTvExplainLinkTvExplainLink extends Schema.CollectionType {
  collectionName: 'tv_explain_links';
  info: {
    singularName: 'tv-explain-link';
    pluralName: 'tv-explain-links';
    displayName: 'TV Explain Link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Description: Attribute.Text & Attribute.Required;
    locations: Attribute.Relation<
      'api::tv-explain-link.tv-explain-link',
      'oneToMany',
      'api::location.location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tv-explain-link.tv-explain-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tv-explain-link.tv-explain-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTvProductLinkTvProductLink extends Schema.CollectionType {
  collectionName: 'tv_product_links';
  info: {
    singularName: 'tv-product-link';
    pluralName: 'tv-product-links';
    displayName: 'TV Product Link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Variant_ID: Attribute.BigInteger & Attribute.Required;
    Description: Attribute.Text & Attribute.Required;
    locations: Attribute.Relation<
      'api::tv-product-link.tv-product-link',
      'oneToMany',
      'api::location.location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tv-product-link.tv-product-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tv-product-link.tv-product-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTvVideoTvVideo extends Schema.CollectionType {
  collectionName: 'tv_videos';
  info: {
    singularName: 'tv-video';
    pluralName: 'tv-videos';
    displayName: 'TV Video';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    tv_category: Attribute.Relation<
      'api::tv-video.tv-video',
      'oneToOne',
      'api::tv-category.tv-category'
    >;
    Season: Attribute.Integer & Attribute.Required;
    Episode: Attribute.Integer & Attribute.Required;
    Transcript: Attribute.Text & Attribute.Required;
    tv_product_link: Attribute.Relation<
      'api::tv-video.tv-video',
      'oneToOne',
      'api::tv-product-link.tv-product-link'
    >;
    tv_explain_link: Attribute.Relation<
      'api::tv-video.tv-video',
      'oneToOne',
      'api::tv-explain-link.tv-explain-link'
    >;
    Description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Duration: Attribute.BigInteger & Attribute.Required;
    Keywords: Attribute.Component<'keywords.keywords', true> &
      Attribute.Required;
    Publish_Date: Attribute.DateTime & Attribute.Required;
    locations: Attribute.Relation<
      'api::tv-video.tv-video',
      'oneToMany',
      'api::location.location'
    >;
    URL: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Youtube_Video_ID: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Thumbnail: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tv-video.tv-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tv-video.tv-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVipEdmVipEdm extends Schema.CollectionType {
  collectionName: 'vip_edms';
  info: {
    singularName: 'vip-edm';
    pluralName: 'vip-edms';
    displayName: 'VIP EDM';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Email_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    author: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'api::author.author'
    >;
    Published_Date: Attribute.DateTime & Attribute.Required;
    edm_hero_image: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'api::edm-hero-image.edm-hero-image'
    >;
    Intro_Title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    Intro_Blurb: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 256;
      }>;
    edm_product_reels: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToMany',
      'api::edm-product-reel.edm-product-reel'
    >;
    edm_voucher_offer: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'api::edm-voucher-offer.edm-voucher-offer'
    >;
    edm_slim_promotion_banners: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToMany',
      'api::edm-slim-promotion-banner.edm-slim-promotion-banner'
    >;
    edm_product_spotlight: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'api::edm-product-spotlight.edm-product-spotlight'
    >;
    edm_category_links: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToMany',
      'api::edm-category-links.edm-category-links'
    >;
    post: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'api::post.post'
    >;
    Slug: Attribute.UID;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vip-edm.vip-edm',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::atms-tv-category.atms-tv-category': ApiAtmsTvCategoryAtmsTvCategory;
      'api::atms-tv-post.atms-tv-post': ApiAtmsTvPostAtmsTvPost;
      'api::author.author': ApiAuthorAuthor;
      'api::category.category': ApiCategoryCategory;
      'api::edm-category-links.edm-category-links': ApiEdmCategoryLinksEdmCategoryLinks;
      'api::edm-hero-image.edm-hero-image': ApiEdmHeroImageEdmHeroImage;
      'api::edm-product-reel.edm-product-reel': ApiEdmProductReelEdmProductReel;
      'api::edm-product-spotlight.edm-product-spotlight': ApiEdmProductSpotlightEdmProductSpotlight;
      'api::edm-product-spotlight-backgrounds.edm-product-spotlight-backgrounds': ApiEdmProductSpotlightBackgroundsEdmProductSpotlightBackgrounds;
      'api::edm-slim-promotion-banner.edm-slim-promotion-banner': ApiEdmSlimPromotionBannerEdmSlimPromotionBanner;
      'api::edm-voucher-offer.edm-voucher-offer': ApiEdmVoucherOfferEdmVoucherOffer;
      'api::faq.faq': ApiFaqFaq;
      'api::faq-group.faq-group': ApiFaqGroupFaqGroup;
      'api::homepage-news-media.homepage-news-media': ApiHomepageNewsMediaHomepageNewsMedia;
      'api::keyword.keyword': ApiKeywordKeyword;
      'api::location.location': ApiLocationLocation;
      'api::mcp-seo.mcp-seo': ApiMcpSeoMcpSeo;
      'api::new-tag.new-tag': ApiNewTagNewTag;
      'api::podcast.podcast': ApiPodcastPodcast;
      'api::podcast-author.podcast-author': ApiPodcastAuthorPodcastAuthor;
      'api::podcast-item.podcast-item': ApiPodcastItemPodcastItem;
      'api::podcast-owner.podcast-owner': ApiPodcastOwnerPodcastOwner;
      'api::post.post': ApiPostPost;
      'api::question-and-answer.question-and-answer': ApiQuestionAndAnswerQuestionAndAnswer;
      'api::sex-survey-page.sex-survey-page': ApiSexSurveyPageSexSurveyPage;
      'api::sex-survey-template-1.sex-survey-template-1': ApiSexSurveyTemplate1SexSurveyTemplate1;
      'api::sex-survey-template-2.sex-survey-template-2': ApiSexSurveyTemplate2SexSurveyTemplate2;
      'api::sex-survey-template-3.sex-survey-template-3': ApiSexSurveyTemplate3SexSurveyTemplate3;
      'api::sex-survey-template-4.sex-survey-template-4': ApiSexSurveyTemplate4SexSurveyTemplate4;
      'api::sex-survey-template-5.sex-survey-template-5': ApiSexSurveyTemplate5SexSurveyTemplate5;
      'api::staff-review.staff-review': ApiStaffReviewStaffReview;
      'api::tag.tag': ApiTagTag;
      'api::tv-article.tv-article': ApiTvArticleTvArticle;
      'api::tv-category.tv-category': ApiTvCategoryTvCategory;
      'api::tv-explain-link.tv-explain-link': ApiTvExplainLinkTvExplainLink;
      'api::tv-product-link.tv-product-link': ApiTvProductLinkTvProductLink;
      'api::tv-video.tv-video': ApiTvVideoTvVideo;
      'api::vip-edm.vip-edm': ApiVipEdmVipEdm;
    }
  }
}
