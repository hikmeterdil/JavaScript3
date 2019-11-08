{
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
   
  function fetchJSON(url, cb) {
        fetch(url)
      .then(response => {
        if(response.status !== 200)
          {
            const err = new Error();
            err.message = response.status;
            throw err;
          }
          return response.json()})
      .then(json => cb(null, json))
      .catch(err => cb(err));
  
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

  function addTable(table, header, value) {
    const tr = createAndAppend('tr', table);
    createAndAppend('th', tr, { text: header });
    createAndAppend('td', tr, { text: value });
    return tr;
  }

  function addOptions(repo, index) {
    const select1 = document.querySelector('.repoList');
    createAndAppend('option', select1, { text: repo.name, value: index });
    return select1;
  }
  
  function fetchandRenderContributers(repo) {
    fetchJSON(repo.contributors_url, (err, contributers) => {
      if (err) {
        console.log(err);
        return;
      }

      const ul = createAndAppend('ul', right);
      contributers.forEach(contributer =>
        renderContributor(contributer, right),
      );
    });
  }

  const selectOption = repos => {
    const select1 = document.querySelector('.repoList');
    select1.addEventListener('change', e => {
      renderRepoDetails(repos[e.target.value]);
      right.innerHTML = '';
      fetchandRenderContributers(repos[e.target.value]);
    });
  };

  function createOrGetRepoTable() {
    const repoTable = document.getElementById('repo-table');
    if (repoTable !== null) {
      return repoTable;
    }

    const table = createAndAppend('table', left);
    table.id = 'repo-table';
    return table;
  }

  function renderRepoDetails(repo) {
    const table = createOrGetRepoTable();
    table.innerHTML = '';
    const tr1 = addTable(table, 'Repository:', '');
    createAndAppend('a', tr1.lastChild, {
      href: repo.html_url,
      text: repo.name,
      target: '_blank',
    });
    addTable(table, 'Description: ', repo.description);
    addTable(table, 'Fork: ', repo.forks);
    addTable(table, 'Updated: ', formatDate(repo.updated_at));
  }

  function renderContributor(contributor, contributorList) {
    const ul = createAndAppend('ul', contributorList);
    const listItem = createAndAppend('li', ul, { class: 'list-item' });
    const listEleDetail = createAndAppend('a', listItem, {
      class: 'list-ele-detail',
      href: contributor.html_url,
      target: '_blank'
    });
    createAndAppend('img', listEleDetail, {
      class: 'avatar',
      src: contributor.avatar_url,
    });
    createAndAppend('span', listEleDetail, {
      class: 'contributor-name',
      text: contributor.login,
    });
    createAndAppend('span', listEleDetail, {
      class: 'contribution-count',
      text: contributor.contributions,
    });
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

      const select1 = createAndAppend('select', header, {
        name: 'repoList',
        class: 'repoList',
        id: 'repoList',
      });


      repos.sort((a, b) => a.name.localeCompare(b.name));
      repos.forEach((repo, index) => addOptions(repo, index));
      selectOption(repos);
      const event = new Event('change');
      select1.dispatchEvent(event);
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
