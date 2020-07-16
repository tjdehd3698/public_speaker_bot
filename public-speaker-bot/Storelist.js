getUploadedAttachment(turnContext) {
    const imageData = fs.readFileSync(path.join(__dirname, 'C:\Users\성동꾸리\Documents\GitHub\public_speaker_bot\public-speaker-bot/Storelist.png'));
    const connector = turnContext.adapter.createConnectorClient(turnContext.activity.serviceUrl);
    const conversationId = turnContext.activity.conversation.id;
    const response = await connector.conversations.uploadAttachment(conversationId, {
        name: 'Storelist.png',
        originalBase64: imageData,
        type: 'image/png'
    });

    // Retrieve baseUri from ConnectorClient for... something.
    const baseUri = connector.baseUri;
    const attachmentUri = baseUri + (baseUri.endsWith('/') ? '' : '/') + `v3/Storelist/${encodeURI(response.id)}/views/original`;
    return {
        name: 'Storelist.png',
        contentType: 'image/png',
        contentUrl: attachmentUri
    };
}