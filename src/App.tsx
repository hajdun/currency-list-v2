import React from 'react'
// import { useParams } from 'react-router-dom'

import './App.css'

import { chainedGetListRequest } from './api/routes'
import { ComposedCurrency } from './models/ComposedCurrency'
import { RouteComponentProps } from './models/RouterParams'

import PageTitle from './Layout/Header/PageTitle'
import Header from './Layout/Header/Header'
import List from './Layout/SearchResult/List'
import ErrorBoundary from './Layout/ErrorBoundary/ErrorBoundary'

interface IState {
  fullCurrenyList: Array<ComposedCurrency>
  currencyList: Array<ComposedCurrency>
}

interface IProps {
  filterOptions: string
}

class App extends React.Component<RouteComponentProps<IProps>, IState> {
  constructor(props: RouteComponentProps<IProps>) {
    super(props)
    this.state = {
      fullCurrenyList: [],
      currencyList: [],
    }
  }

  async componentDidMount(): Promise<void> {
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

  performFiltering = (filterCondition: string): void => {
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

  filterFromSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const filterCondition = event.target.value
    this.performFiltering(filterCondition)
  }

  filterFromUrlParam = (): void => {
    const { filterOptions } = this.props.match.params
    this.performFiltering(filterOptions)
  }

  render(): JSX.Element {
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
