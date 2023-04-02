'use strict';

const e = React.createElement;

class RecipeItem extends React.Component {
    render() {
        return e('div', {style: {color: 'royalblue'}}, this.props.title,
            ...this.props.in.map(v => e('span', {style: {borderBottom: '1px dotted', cursor: 'pointer'}}, v)),
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
            return e('div', null, ''+this.state.error)
        }
        return e('ul', null, ...this.state.recipes.map(v =>
                e(RecipeItem, v)
            )
        );
    }
}


ReactDOM.createRoot(document.querySelector('#app')).render(e(RecipeList));
