import React from 'react'
// import { useParams } from 'react-router-dom'

import './App.css'

import { chainedGetListRequest } from './api/routes'
import { ComposedCurrency } from './models/ComposedCurrency'
import PageTitle from './Layout/Header/PageTitle'
import Header from './Layout/Header/Header'
import List from './Layout/SearchResult/List'
import ErrorBoundary from './Layout/ErrorBoundary/ErrorBoundary'

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
    this.setState(
      {
        fullCurrenyList: currencyList,
        currencyList,
      },
      () => {
        this.filterFromUrlParam()
      }
    )
  }

  performFiltering = (filterCondition: string) => {
    this.setState((prevState) => ({
      currencyList: prevState.fullCurrenyList,
    }))

    if (filterCondition) {
      const filteredCurrencyList = this.state.fullCurrenyList.filter((elem: ComposedCurrency) => {
        const stringifiedCurrency = JSON.stringify(elem).toLowerCase()
        return stringifiedCurrency.includes(filterCondition.toLowerCase())
      })
      // filter
      this.setState({
        currencyList: filteredCurrencyList,
      })
    }
  }

  filterFromSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterCondition = event.target.value
    this.performFiltering(filterCondition)
  }

  filterFromUrlParam = () => {
    const { filterOptions } = this.props.match.params // const { filterOptions } = useParams()
    console.error('filterFromUrlParam', filterOptions)
    this.performFiltering(filterOptions)
  }

  render() {
    const { currencyList } = this.state
    return (
      <ErrorBoundary>
        <PageTitle />
        <Header filter={this.filterFromSearch} />
        <List currencyList={currencyList} />
      </ErrorBoundary>
    )
  }
}

export default App
