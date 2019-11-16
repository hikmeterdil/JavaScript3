'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      this.container.innerHTML = '';
    const table = createAndAppend('table', this.container);
     const tr1 = this.addTable(table, 'Repository:', '');
     createAndAppend('a', tr1.lastChild, {
       href: repo.html_url,
       text: repo.name,
       target: '_blank',
     });
     this.addTable(table, 'Description: ', repo.description);
     this.addTable(table, 'Fork: ', repo.forks);
     this.addTable(table, 'Updated: ', new Date(repo.updated_at).toLocaleDateString());
      console.log('RepoView', repo);
    }
    addTable(table, header, value) {
      const tr = createAndAppend('tr', table);
      createAndAppend('th', tr, { text: header });
      createAndAppend('td', tr, { text: value });
      return tr;
    }
  }

  window.RepoView = RepoView;
}
