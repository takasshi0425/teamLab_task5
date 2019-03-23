import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { products: [] };
        this.reloadCompanyApi = this.reloadproductApi.bind(this);
    }

    reloadCompanyApi() {
        fetch('http://localhost/teamLab_task_Version1/api/users/get', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if(res.ok) {
                return res.json();
            } else {
                console.log('error!');
            }
        }).then(json => {
            const companies = json.map(r => {
                return {
                    product_id: r.id,
                    product_name: r.name,
                    product_exp: r.exp,
                    product_price: r.price
                };
            });
            companies.sort(function (a, b) {　return -(a.product_id - b.product_id);　});
            this.setState({ products: products });
        });
    }

    componentWillMount() {
        this.reloadCompanyApi();
        setInterval(this.reloadCompanyApi, '5000');
    }

    render() {
        return (
            <div>
                <h1>商品管理</h1>
                <CompanyList companies={ this.state.products } />
            </div>
        );
    }
}

class CompanyList extends Component {
    render() {
        const companiesMap = this.props.products.map(c => {
            return <CompanyItem { ...c } key={ c.product_id } />;
        });

        return (
            <table>
                <thead>
                    <tr><th>商品ID</th><th>商品名</th><th>商品説明</th><th>商品価格</th></tr>
                </thead>
                <tbody>{ productsMap }</tbody>
            </table>
        );
    }
}

function CompanyItem (props)　{
    return (
        <tr>
            <td>{ props.product_id }</td>
            <td>{ props.product_name }</td>
            <td>{ props.product_exp }</td>
            <td>{ props.product_price }</td>
        </tr>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
