import React from 'react'

import './App.css'

import { chainedGetListRequest } from './api/routes'
import { ComposedCurrency } from './models/ComposedCurrency'
import PageTitle from './Layout/Header/PageTitle'
import Header from './Layout/Header/Header'
import List from './Layout/SearchResult/List'

interface IState {
  fullCurrenyList: Array<ComposedCurrency>
  currencyList: Array<ComposedCurrency>
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      fullCurrenyList: [],
      currencyList: [],
    }
  }

  async componentDidMount() {
    const currencyList = await chainedGetListRequest()
    this.setState({
      fullCurrenyList: currencyList,
      currencyList,
    })
  }

  filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterCondition = event.target.value
    if (filterCondition) {
      const filteredCurrencyList = this.state.fullCurrenyList.filter((elem: ComposedCurrency) => {
        const stringifiedCurrency = JSON.stringify(elem).toLowerCase()
        return stringifiedCurrency.includes(filterCondition.toLowerCase())
      })
      // filter
      this.setState({
        currencyList: filteredCurrencyList,
      })
    } else {
      // reset to full list
      this.setState((prevState) => ({
        currencyList: prevState.fullCurrenyList,
      }))
    }
  }

  render() {
    const { currencyList } = this.state
    return (
      <>
        <PageTitle />
        <Header filter={this.filter} />
        <div className="listWrapper">
          <List currencyList={currencyList} />
        </div>
      </>
    )
  }
}

export default App
