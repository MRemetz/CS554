import React, { Component } from "react";

class PersonNode extends Component {
  render() {
    const { className, nodeData } = this.props;
    let person = nodeData.name;
    let person_info = `Name: ${nodeData.name}`;
    if (nodeData.attributes.spouse != ""){
      person +=` - ${nodeData.attributes.spouse}`;
      person_info +=`, Spouse: ${nodeData.attributes.spouse}`;
    }

    return (
      <div className="nodePerson">
        <button type="button" class="btn-dark" data-toggle="tooltip" data-placement="top" title={JSON.stringify(person_info)}>
        {person}
        </button>
      </div>
    );
  }
}
export default PersonNode;