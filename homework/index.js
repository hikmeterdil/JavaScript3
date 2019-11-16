'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function formatDate(updateResponse) {
    const dateTime = new Date(updateResponse);
    return dateTime.toLocaleString();
  }

  function addTableRow(table, header, value) {
    const tr = createAndAppend('tr', table);
    createAndAppend('th', tr, { text: header });
    createAndAppend('td', tr, { text: value });
    return tr;
  }

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    const table = createAndAppend('table', li);
    const tr1 = addTableRow(table, 'Repository:', '');

    createAndAppend('a', tr1.lastChild, {
      href: repo.html_url,
      text: repo.name,
    });
    addTableRow(table, 'Description: ', repo.description);
    addTableRow(table, 'Fork: ', repo.forks);
    addTableRow(table, 'Updated: ', formatDate(repo.updated_at));
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: 'HYF Repositories',
          id: 'header',
        });
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const header = createAndAppend('div', root, {
        text: 'HYF Repositories',
        id: 'header',
      });

      const ul = createAndAppend('ul', root);

      repos.sort((a, b) => a.name.localeCompare(b.name));
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}
