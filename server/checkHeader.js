/**
 * React Dmarc Sift. DAG's 'Parse' node implementation
 */
"use strict";

// Javascript nodes are run in a Node.js sandbox so you can require dependencies following the node paradigm
// e.g. var moment = require('moment');

// Entry point for DAG node
module.exports = function (got) {
  // inData contains the key/value pairs that match the given query
  const inData = got.in;

  console.log("email-sift-web: parse.js: running...");

  const results = inData.data.map(({ value: valueBuffer }) => {
    // Parse the JMAP information for each message more info here: https://docs.redsift.com/docs/server-code-jmap
    const emailJmap = JSON.parse(valueBuffer);
    const { id, threadId, subject, textBody, strippedHtmlBody } = emailJmap;

    //console.log(id, threadId, subject, textBody, strippedHtmlBody);
    //console.log(emailJmap);

    // Not all emails contain a textBody so we do a cascade selection
    const body = textBody || strippedHtmlBody || "";

    const key = `${threadId}/${id}`;
    const value = {
      id,
      body,
      subject,
      threadId,
    };

    // Emit into "messages-st" store so count can be calculated by the "Count" node
    // Emit information on the "messages" output so we can display them in the email list and detail

    // Emit to display the headers
    return [
      {
        key,
        value,
        name: "display",
      },
    ];
  });

  // Possible return values are: undefined, null, promises, single or an array of objects
  // return objects should have the following structure
  // {
  //   name: '<name of node output>',
  //   key: 'key1',
  //   value: '1'
  // };
  return [].concat(...results);
};
