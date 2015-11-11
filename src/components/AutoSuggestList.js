import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

class AutoSuggestList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let mainClasses = cx('AutoSuggestList', {
      [this.props.className]: this.props.className,
      'AutoSuggestList--is-visible': this.props.show && this.props.items.length
    });

    let listClasses = cx('AutoSuggestList__list', {});

    let sections = {
      'Online Coupon Codes': this.props.items.filter(item => item.businessType === 'AFFILIATE'),
      [`Businesses near ${this.props.currentGeo}`]: this.props.items.filter(item => item.businessType === 'LOCAL'),
      'Top Searches': this.props.items.filter(item => item.businessType === 'TOP_SEARCH')
    };

    let itemsCount = 1;

    let sectionLists = Object.keys(sections).map((section, key1) => {
      if (sections[section].length) {
        
        let items = sections[section].map((item, key2) => {
          return (
            <div 
              key={key2} 
              tabIndex={itemsCount++}
              className="AutoSuggestList__list__item"
              onTouchTap={this.handleItemSelected.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              data-item={JSON.stringify(item)}>
              <div className="AutoSuggestList__list__item__logo">
                {item.businessType !== 'TOP_SEARCH' ? (
                  <img src={item.logoURL || "https://placehold.it/100x100"} />
                ) : (
                  <Icon 
                    className="top-search__icon"
                    path="action/svg/production/ic_search_24px.svg"/>
                )}
              </div>
              <div 
                className="AutoSuggestList__list__item__label" 
                dangerouslySetInnerHTML={{__html: item.businessName}}/>
            </div>
          );
        });

        return (
          <div 
            key={key1} 
            className="AutoSuggestList__list__section">
            <div className="AutoSuggestList__list__section__header">
              <div>{section}</div>
              {key1 === 1 ? <button className="AutoSuggestList__list__section__header__button" onTouchTap={this.handleLocationChangeTap.bind(this)}>Change Location</button> : ''}
            </div>
            {items}
          </div>
        )
      }
    })

    return (
      <div 
        ref="content"
        className={mainClasses}>

        <div 
          ref="itemList"
          className={listClasses}>
          {sectionLists}
        </div>

      </div>
    );
  }

  handleItemSelected(e) {
    let item = JSON.parse(e.currentTarget.getAttribute('data-item'));
    this.props.onItemSelected(item);
  }

  handleKeyUp(e) {
    if (e.keyCode !== 13) return
    let item = JSON.parse(e.currentTarget.getAttribute('data-item'));
    this.props.onItemSelected(item);
  }

  handleLocationChangeTap(e) {
    this.props.onLocationChangeTap(e);
  }

}

AutoSuggestList.defaultProps = {
  items: [],
  show: false,
  onItemSelected: function() {},
  onLocationChangeTap: function() {}
};

export default AutoSuggestList;