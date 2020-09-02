/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  };

  handleClick = (key) => {
    let targetDiv = document.getElementById(key);
    targetDiv.style.display = 'block';
  };

  renderTableData() {
    const { t, data } = this.props;

    const { messages } = data;
    return messages.map((m, key) => {
      return (
        <React.Fragment>
          <tr key={key} className="table-row">
            <td className="table-cell">{m.subject}</td>
            <td className="table-cell">{m.wordCount}</td>
            <button
              onClick={(e) => this.handleClick(key)}
              className="table-button"
            >
              Check
            </button>
          </tr>
          <div style={{ display: 'none' }} id={key}>
            <ul className="table-list">
              <li>dKIM:</li>
              <li>SPF:</li>
              <li>dMARC:</li>
            </ul>
          </div>
        </React.Fragment>
      );
    });
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;

    console.log(messages);

    return (
      <div>
        <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', { count: counts.messageTotal })}</h4>
        <table className="table">
          <tr>
            <th className="table-head">Subject</th>
            <th className="table-head">Word Count</th>
            <th className="table-head">Check Headers</th>
          </tr>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default translate(['app'], { wait: true })(App);
