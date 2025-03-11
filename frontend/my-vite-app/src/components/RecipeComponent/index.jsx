import React, { Component } from "react";
import axios from "axios";
import { MdLightMode, MdDarkMode } from "react-icons/md"; // Import both icons
import './style.css';

class RecipeComponent extends Component {
  // State
  state = {
    recipes: [],
    newRecipe: { name: "", category: "", ingredients: "", instructions: "", image: "" },
    selectedRecipe: null,
    showAddForm: false,
    darkMode: false,
  };

  backendUrl = 'https://recipe-full-stack-project-backend-1.onrender.com'; // Define backendUrl

  componentDidMount() {
    this.fetchRecipes();
  }

  // GET method
  fetchRecipes = async () => {
    try {
      const response = await axios.get(`${this.backendUrl}/recipes`);
      this.setState({ recipes: response.data });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // PUT method
  updateRecipe = async () => {
    try {
      await axios.put(`${this.backendUrl}/recipes/${this.state.selectedRecipe._id}`, this.state.selectedRecipe);
      this.setState({ selectedRecipe: null });
      this.fetchRecipes();
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  // POST method
  addRecipe = async () => {
    try {
      await axios.post(`${this.backendUrl}/recipes`, this.state.newRecipe);
      this.setState({ newRecipe: { name: "", category: "", ingredients: "", instructions: "", image: "" } });
      this.fetchRecipes();
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  /* Handlers */

  handleChange = (e) => {
    this.setState({
      newRecipe: { ...this.state.newRecipe, [e.target.name]: e.target.value },
    });
  };

  selectRecipe = (recipe) => {
    this.setState({ selectedRecipe: recipe });
  };

  handleUpdateChange = (e) => {
    this.setState({
      selectedRecipe: { ...this.state.selectedRecipe, [e.target.name]: e.target.value },
    });
  };

  toggleAddForm = () => {
    this.setState((prevState) => ({ showAddForm: !prevState.showAddForm }));
  };

  toggleTheme = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  // Render
  render() {
    const { recipes, newRecipe, selectedRecipe, showAddForm, darkMode } = this.state;
    return (
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className="theme-toggle" onClick={this.toggleTheme}>
          {darkMode ? (
            <MdLightMode size={30} color="white" /> // Light mode icon
          ) : (
            <MdDarkMode size={30} /> // Dark mode icon
          )}
        </div>

        <h1 style={{ color: darkMode ? "white" : "grey", textAlign: "center", fontSize: "bold" }}>Recipe Manager</h1>

        {Object.entries(recipes).map(([category, recipes]) => (
          <div key={category}>
            <div className="receipeCent">
              <h3 style={{ color: darkMode ? "lightblue" : "grey", textAlign: "center", fontSize: "bold" }}>{category}</h3>
              <div className="recipeContainer">
                {recipes.map((recipe) => (
                  <div key={recipe._id} className="recipeCard">
                    <div onClick={() => this.selectRecipe(recipe)}>
                      <h4>{recipe.name}</h4>
                      <img src={recipe.image} alt={recipe.name} style={{ width: "150px" }} />
                      <p>{recipe.ingredients}</p>
                      <p>{recipe.instructions}</p>
                    </div>

                    {selectedRecipe && (
                      <div>
                        <h2>Update Recipe</h2>
                        <input
                          type="text"
                          name="name"
                          value={selectedRecipe.name}
                          onChange={this.handleUpdateChange}
                        />
                        <select
                          name="category"
                          value={selectedRecipe.category}
                          onChange={this.handleUpdateChange}
                        >
                          <option value="VegRecipe">Veg Recipe</option>
                          <option value="NonVegRecipe">Non-Veg Recipe</option>
                          <option value="IceCreams">Ice Creams</option>
                          <option value="Cakes">Cakes</option>
                        </select>
                        <input
                          type="text"
                          name="ingredients"
                          value={selectedRecipe.ingredients}
                          onChange={this.handleUpdateChange}
                        />
                        <input
                          type="text"
                          name="instructions"
                          value={selectedRecipe.instructions}
                          onChange={this.handleUpdateChange}
                        />
                        <input
                          type="text"
                          name="image"
                          value={selectedRecipe.image}
                          onChange={this.handleUpdateChange}
                        />
                        <button onClick={this.updateRecipe}>Update Recipe</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="addBtn">
          <button onClick={this.toggleAddForm}>{showAddForm ? "Cancel" : "Add Recipe"}</button>
          {showAddForm && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Recipe Name"
                value={newRecipe.name}
                onChange={this.handleChange}
              />
              <select name="category" value={newRecipe.category} onChange={this.handleChange}>
                <option value="">Select Category</option>
                <option value="VegRecipe">Veg Recipe</option>
                <option value="NonVegRecipe">Non-Veg Recipe</option>
                <option value="IceCreams">Ice Creams</option>
                <option value="Cakes">Cakes</option>
              </select>
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients"
                value={newRecipe.ingredients}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="instructions"
                placeholder="Instructions"
                value={newRecipe.instructions}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newRecipe.image}
                onChange={this.handleChange}
              />
              <button onClick={this.addRecipe}>Submit Recipe</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RecipeComponent;
