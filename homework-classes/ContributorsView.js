'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerHTML = '';
      contributors.forEach(contributor =>
      this.renderContributor(contributor));
      console.log('ContributorsView', contributors);
    }
    renderContributor(contributor) {
      const ul = createAndAppend('ul', this.container);
      const listItem = createAndAppend('li', ul, { class: 'list-item' });
      const listEleDetail = createAndAppend('a', listItem, {
        class: 'list-ele-detail',
        href: contributor.html_url,
        target: '_blank',
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
  }

  window.ContributorsView = ContributorsView;
}
