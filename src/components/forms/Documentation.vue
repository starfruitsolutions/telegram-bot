<template>
  <div v-pre class="mt-5">
    <h4>Data Sources</h4>
    <br>
    <p>A data source is a connection to an external rest API.<p>
      <ul>
        <li>The name field is just a label used to reference the data in the final message template.</li>
        <li>Select the method and enter the url for the api endpoint</li>
        <li>The body accepts the standard json format</li>
      </ul>
    <p>
      Template variables from the command ( {{ args.[index] }} ) are permitted in the data source URL and body,
      but be careful not to create opportunities for injection attacks.
    </p>
    <h4> Templating </h4>
    <br>
    <p>
      Templating can be used in data source fields and the final message template.
    </p>
    <p>
       You can render a variable value in its place by reference using double braces:
       <pre>{{ variable }}</pre>
    </p>
    <p>
      If a variable has special characters, it can be rendered without escaping using:
      <pre>{{{ variable }}}</pre>
      However, be conscious that this poses an increased injection risk.
    </p>

    <h4> Available Data </h4>
    <br>
    <p>
      All data uses dot notation, including arrays.
    </p>
    <p>
      Bot command arguments are at:
      <pre>{{ args.[index] }}</pre>
      starting with the command itself at:
      <pre>{{ args.0 }}</pre>
      The <a href="https://core.telegram.org/bots/api#update" target="_blank">message</a> from the telegram update can be accessed at:
      <pre>{{ message.[field]... }}</pre>
      Data sources can be referenced by their assigned name.
      <pre>{{ sources.[name] }}</pre><br>
    </p>

    <h4> Formatters </h4>
    <br>
    <p>
      Formatters allow manipulation of the data.
      <pre>{{ variable | formatter }}</pre>
      They can be strung together in chains.
      <pre>{ variable | formatter1 | formatter2 | ... }}</pre>
      Currently only basic arithmetic functions are supported( add, subtract, multiply, divide)<br>
      <pre>{{ args.1 | add: args.2 }}</pre>
      will add two arguments together<br>
    </p>

    <h4> Additional Documentation </h4>
    <br>
    <p>
      Bot documentation:  <a href="https://core.telegram.org/bots/api" target="_blank">Telegram Bot API</a><br>
      Templating documentation: <a href="https://github.com/janl/mustache.js" target="_blank">moustache.js Github</a><br>
      Formatter documentation: <a href="http://jvitela.github.io/mustache-wax/" target="_blank">moustache-wax</a>
    </p>
  </div>
</template>
