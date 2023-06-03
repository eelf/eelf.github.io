'use strict';

const e = React.createElement;

Array.prototype.interleave = function (glue) {
    return this.reduce((acc, v) => {
        if (acc.length != 0) acc.push(glue);
        acc.push(v);
        return acc;
    }, []);
};

class RecipeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hover:{}};
    }
    render() {
        return e(
            'div',
            {style: {color: 'royalblue'}},
            e('div', null, this.props.title),
            ...this.props.in.map(v => e(
                'span',
                {
                    style: {
                        borderBottom: '1px dotted',
                        cursor: 'pointer',
                        color: this.state.hover[v] ? 'blue' : '',
                    },
                    onClick: () => this.props.filter(v),
                    onMouseEnter: () => this.setState({hover:{[v]:true}}),
                    onMouseLeave: () => this.setState({hover:{}}),
                },
                v))
                .interleave(' '),
            e('div', null, this.props.steps)
        );
    }
}

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            error: null,
            filter: null,
        };
    }

    componentDidMount = () => {
        fetch('recipe.json')
            .then(r => r.json())
            .then(r => this.setState({recipes: r}))
            .catch(e => this.setState({error: e}));
    }

    render() {
        if (this.state.error) {
            return e('div', null, '' + this.state.error)
        }
        return e(
            'ul',
            null,
            ...this.state.recipes
                .filter(v => {
                    return this.state.filter == null || v.in.indexOf(this.state.filter) !== -1;
                })
                .map(v =>
                    e(RecipeItem, {
                        filter: v => {
                            if (this.state.filter === v) v = null;
                            this.setState({filter: v})
                        }, ...v
                    })
                )
        );
    }
}


ReactDOM.createRoot(document.querySelector('#app')).render(e(RecipeList));
