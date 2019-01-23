import React, { Component } from "react";
import Tree from "react-d3-tree";
import PersonNode from './PersonNode';
const axios = require("axios");

/* Uses https://github.com/bkrem/react-d3-tree for basic tree logic*/

var data = null;
var fam = [];

const myTreeData = [
  {
    name: "Jay Pritchett",
    attributes: {
      spouse: "Gloria Pritchett",
    },
    children: [
      {
        name: "Claire Pritchett",
        attributes: {
          spouse: "Phil Dunphy"
        },
        children: [
          {
            name: "Hayley Dunphy",
            attributes: {
              spouse: ""
            }
          }, {
            name: "Alex Dunphy",
            attributes: {
              spouse: ""
            }
          }, {
            name: "Luke Dunphy",
            attributes: {
              spouse: ""
            }
          }
        ]
      }, {
        name: "Mitchell Pritchett",
        attributes: {
          spouse: "Cameron Tucker"
        },
        children: [
          {
            name: "Lily Pritchett-Tucker",
            attributes: {
              spouse: ""
            }
          }
        ]
      }, {
        name: "Joe Pritchett",
        attributes: {
          spouse: ""
        }
      }, {
        name: "Manny Delgado",
        attributes: {
          spouse: ""
        }
      }
    ]
  }
];

class CreateFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstname: "",
      lastname: "",
      pf: "",
      pl: "",
      mf: "",
      ml: "",
      age: null,
      gender: "",
      ok: "",
      tree: null,
    };
    this.upload = this.upload.bind(this);
    this.getTree = this.getTree.bind(this);
    this.getKids = this.getKids.bind(this);
    this.sanitize = this.sanitize.bind(this);

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  sanitize() {
    if (data[0]) {
      var root = data.splice(0, 1)[0];
      console.log("root: ");
      console.log(root);
      var node = {};
      console.log(node);
      node.name = `${root.firstName} ${root.lastName}`;
      console.log(node);
      node.attributes = {};

      //PROBLEM HERE: node.attributes.spouse is not being created
      node.attributes.spouse = `${root.spouse.firstName} ${root.spouse.lastName}`;
      node.attributes.index = i;
      console.log(node);
      node.children = [];
      console.log(node);
      console.log(root.children);
      if (root.children) {
        fam.push(this.getKids(root.children, node));
      }
      fam.push(node);
      this.sanitize()
    }
  }

  getKids(children, parent) {
    console.log(children);
    for (var i = 0; i < children.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (children.includes(data[i]._id)) {
          console.log("child: " + data[i]._id);

          var child = data.splice(j, 1);
          childObj = {};
          childObj.name = `${root.firstName} ${root.lastName}`;
          //console.log(node);
          childObj.attributes = {};
          childObj.attributes.spouse = `${root.spouse.firstName} ${root.spouse.lastName}`;
          childObj.attributes.index = i;
          //console.log(node);
          childObj.children = [];
          //console.log(node);
          if (child.children) {
            childObj.children.push(this.getKids(child.children, childObj));
          }
          parent.children.push(childObj);
        }
      }
    }
    return parent;
  }

  upload() {
    const data = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      pf: this.state.pf,
      pl: this.state.pl,
      mf: this.state.mf,
      ml: this.state.ml,
      age: this.state.age,
      gender: this.state.gender
    };
    const addEndpoint = "http://localhost:3000/api/person/"

    axios
      .post(addEndpoint, data) //sends csv to a data endpoint
      .then(res => {
        this.setState({ id: res.data.id });
        this.setState({ ok: res.data.ok });
        this.getTree();
      }).catch(res => {
        this.setState({ ok: 0 });
      });
  };

  getTree() {
    console.log("here");
    const endpoint = "http://localhost:3000/api/pline/" + this.state.id;
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ tree: res.data });
        console.log(this.state.tree);
        data = res.data;
        this.sanitize();
      }).catch(res => {
        this.setState({ ok: 0 });
      });
  };

  render() {
    return (
      <div class="text-left">
        <h1>Begin tracing your Matrilineal or Patrilineal Line Here</h1>
        <form>
          <div class="form-group">
            <h1>Father:</h1>
            <label for="p1firstname">First Name:</label>
            <input type="text" class="form-control" id="pf" placeholder="Father's first name" value={this.state.pf} onChange={this.handleChange} />
            <label for="p1lastname">Last Name:</label>
            <input type="text" class="form-control" id="pl" placeholder="Father's last name" value={this.state.pl} onChange={this.handleChange} />
            <h1>Mother:</h1>
            <label for="p2firstname">First Name:</label>
            <input type="text" class="form-control" id="mf" placeholder="Mother's first name" value={this.state.mf} onChange={this.handleChange} />
            <label for="p2lastname">Last Name:</label>
            <input type="text" class="form-control" id="ml" placeholder="Mother's last name" value={this.state.ml} onChange={this.handleChange} />
            <h1>Your Info:</h1>
            <label for="firstname">First Name:</label>
            <input type="text" class="form-control" id="firstname" placeholder="Enter your first name" value={this.state.firstname} onChange={this.handleChange} />
            <label for="lastname">Last Name:</label>
            <input type="text" class="form-control" id="lastname" placeholder="Enter your last name" value={this.state.lastname} onChange={this.handleChange} />
            <label for="age">Age:</label>
            <input type="number" class="form-control" id="age" value={this.state.age} onChange={this.handleChange} />
            <label for="gender">
              Gender:
                <select value={this.state.gender} onChange={this.fileChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>
          <button type='button' onClick={this.upload}>Submit</button>
        </form>
      </div>
    );
  }
}

class TreeDisplay extends React.PureComponent {
  state = {}

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 4
      }
    });
  };

  render() {
    return (
      <div id="treeWrapper" ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={myTreeData}
          pathFunc="elbow"
          orientation="vertical"
          translate={this.state.translate}
          allowForeignObjects
          nodeLabelComponent={{
            render: <PersonNode className='myLabelComponentInSvg' />,
            foreignObjectWrapper: {
              y: 15,
              x: 5
            }
          }} />
        <CreateFamily />
      </div>
    );
  }
}

export default TreeDisplay;
