module.exports = ({ env }) => ({
    email: {
    config: {
      provider: "strapi-provider-plugin-mandrill",
      providerOptions: {
        apiKey: process.env.MANDRILL_API_KEY,
      },
     settings: {
        defaultFrom: "customerservice@adulttoymegastore.co.nz",
        defaultName: 'Test Email',
        defaultReplyTo: 'test@email.com',
        defaultHtml: 'Test',
        defaultText: 'Test',
      },
    },
  },
});
