const types = {
  types: [
    {
      name: "Rabbit",
      coats: ["Short", "Long"],
      colors: [
        "Agouti",
        "Black",
        "Blue / Gray",
        "Brown / Chocolate",
        "Cream",
        "Lilac",
        "Orange / Red",
        "Sable",
        "Silver Marten",
        "Tan",
        "Tortoiseshell",
        "White",
      ],
      genders: ["Male", "Female"],
      _links: {
        self: {
          href: "/v2/types/rabbit",
        },
        breeds: {
          href: "/v2/types/rabbit/breeds",
        },
      },
    },
    {
      name: "Bird",
      coats: [],
      colors: [
        "Black",
        "Blue",
        "Brown",
        "Buff",
        "Gray",
        "Green",
        "Olive",
        "Orange",
        "Pink",
        "Purple / Violet",
        "Red",
        "Rust / Rufous",
        "Tan",
        "White",
        "Yellow",
      ],
      genders: ["Male", "Female", "Unknown"],
      _links: {
        self: {
          href: "/v2/types/bird",
        },
        breeds: {
          href: "/v2/types/bird/breeds",
        },
      },
    },
  ],
};

module.exports = types;