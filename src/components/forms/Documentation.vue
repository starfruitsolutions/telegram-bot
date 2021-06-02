<template>
  <div class="mt-5">
    <h4> Templating </h4>
    <br>
    <p>
      The templating engine uses EJS allowing for embedded javascript templates. Templates can be used in data source fields and the final message template.
    </p>
    <p>
       You can render a variable value by using:
       <code>&lt;%= variable %&gt;</code>
    </p>
    <p> List of tags: </p>
    <p>
      <ul>
        <li><code>&lt;%</code> 'Scriptlet' tag, for control-flow, no output</li>
        <li><code>&lt;%_</code> ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it</li>
        <li><code>&lt;%=</code> Outputs the value into the template (HTML escaped)</li>
        <li><code>&lt;%-</code> Outputs the unescaped value into the template</li>
        <li><code>&lt;%#</code> Comment tag, no execution, no output</li>
        <li><code>&lt;%%</code> Outputs a literal '&lt;%'</li>
        <li><code>%&gt;</code> Plain ending tag</li>
        <li><code>-%&gt;</code> Trim-mode ('newline slurp') tag, trims following newline</li>
        <li><code>_%&gt;</code> ‘Whitespace Slurping’ ending tag, removes all whitespace after it</li>
      </ul>
    </p>
    <h4> Available Data </h4>
    <br>
    <pre>
      {
        args: [], // Command arguments starting with the command itself at index 0: args[index]
        message: {} // The <a href="https://core.telegram.org/bots/api#update" target="_blank">message</a> from the telegram update: message.[field]...
        sources: {} // Data sources can be referenced by their assigned name: sources.[name]
      }
    </pre>
    <h4>Data Sources</h4>
    <br>
    <p>A data source is a connection to an external rest API.<p>
      <ul>
        <li>The name field is just a label used to reference the data in the final message template.</li>
        <li>Select the method and enter the url for the api endpoint</li>
        <li>The body accepts the standard json format</li>
      </ul>
    <p>
      <code>args</code> and <code>message</code> are permitted in the data source URL and body,
      but be careful not to create opportunities for injection attacks.
    </p>

    <h4> Additional Documentation </h4>
    <br>
    <p>
      Bot documentation:  <a href="https://core.telegram.org/bots/api" target="_blank">Telegram Bot API</a><br>
      Templating documentation: <a href="https://ejs.co/" target="_blank">EJS</a>
    </p>
  </div>
</template>
