import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  // Types
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    price : Nat; // paisa
    discountPrice : ?Nat;
    imageUrl : Text;
    tags : [Text];
    inStock : Bool;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Review = {
    id : Nat;
    productName : Text;
    customerName : Text;
    rating : Nat;
    comment : Text;
    createdAt : Int;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    createdAt : Int;
  };

  // State
  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Text, List.List<CartItem>>();
  let reviews = Map.empty<Nat, Review>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();

  var nextReviewId = 6;
  var nextContactId = 1;

  // Seed Data
  func initProducts() {
    let productData : [Product] = [
      { id = 1; name = "Blush Pink Mug"; category = "Mugs"; description = "A glossy handmade mug in soft blush pink. Perfect for your morning chai or coffee."; price = 34900; discountPrice = ?29900; imageUrl = ""; tags = ["Handmade", "Sustainable", "Affordable"]; inStock = true },
      { id = 2; name = "Sage Green Mug"; category = "Mugs"; description = "Earthy sage green glaze, smooth to hold, beautiful to look at."; price = 34900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Sustainable", "Affordable"]; inStock = true },
      { id = 3; name = "Cream Serving Bowl"; category = "Bowls"; description = "A generous serving bowl in warm cream with a glossy finish. Ideal for salads, fruits, or display."; price = 59900; discountPrice = ?49900; imageUrl = ""; tags = ["Handmade", "Sustainable"]; inStock = true },
      { id = 4; name = "Sage Green Bowl Set (2)"; category = "Bowls"; description = "Two nested bowls in muted sage green. Stack them, use them, love them."; price = 79900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Sustainable", "Affordable"]; inStock = true },
      { id = 5; name = "Blush Vase"; category = "Vases"; description = "Slender and elegant. A blush pink vase with gold rim accent. Elevates any shelf."; price = 44900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Artisan"]; inStock = true },
      { id = 6; name = "Cream Textured Vase"; category = "Vases"; description = "Organic texture, warm cream tone. Looks stunning with dried flowers."; price = 54900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Artisan"]; inStock = true },
      { id = 7; name = "Pastel Dinner Plate"; category = "Plates"; description = "Handmade dinner plate in soft blush. Microwave safe. Makes every meal feel special."; price = 39900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Sustainable"]; inStock = true },
      { id = 8; name = "Sage Side Plate (Set of 2)"; category = "Plates"; description = "Matching sage green side plates. Perfect for breakfast or snacks."; price = 64900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Sustainable", "Affordable"]; inStock = true },
      { id = 9; name = "Morning Ritual Set"; category = "Sets"; description = "1 mug + 1 bowl + 1 small plate. Everything you need for a mindful morning."; price = 99900; discountPrice = ?84900; imageUrl = ""; tags = ["Handmade", "Gift", "Bestseller"]; inStock = true },
      { id = 10; name = "Home Starter Set"; category = "Sets"; description = "2 mugs + 2 bowls + 2 plates in coordinated pastels. Gift it or keep it."; price = 179900; discountPrice = ?149900; imageUrl = ""; tags = ["Handmade", "Gift", "Bundle"]; inStock = true },
      { id = 11; name = "Gift Box - Single Mug"; category = "Sets"; description = "One beautiful handmade mug in a kraft gift box with ribbon. Ready to gift."; price = 49900; discountPrice = null; imageUrl = ""; tags = ["Handmade", "Gift"]; inStock = true },
      { id = 12; name = "Celebration Bundle"; category = "Sets"; description = "4 mugs + 4 plates in mixed pastels. Great for families or as a housewarming gift."; price = 249900; discountPrice = ?199900; imageUrl = ""; tags = ["Handmade", "Gift", "Bundle", "Bestseller"]; inStock = true },
    ];

    for (product in productData.values()) {
      products.add(product.id, product);
    };
  };

  func initReviews() {
    let reviewData : [Review] = [
      { id = 1; productName = "Morning Ritual Set"; customerName = "Priya Reddy"; rating = 5; comment = "Absolutely love these! The quality is amazing and they look gorgeous on my shelf."; createdAt = 1718097331000000000 },
      { id = 2; productName = "Blush Pink Mug"; customerName = "Ananya Sharma"; rating = 5; comment = "My daily chai tastes better in this mug. Not kidding. Beautiful piece."; createdAt = 1718097331000000000 },
      { id = 3; productName = "Sage Green Bowl Set (2)"; customerName = "Meera Iyer"; rating = 4; comment = "Great quality, fast delivery to Hyderabad. Will order more!"; createdAt = 1718097331000000000 },
      { id = 4; productName = "Home Starter Set"; customerName = "Kavitha Nair"; rating = 5; comment = "Gifted this to my sister. She cried happy tears. Packaging was stunning too."; createdAt = 1718097331000000000 },
      { id = 5; productName = "Cream Serving Bowl"; customerName = "Sunita Rao"; rating = 5; comment = "We switched from plastic and never looked back. Worth every rupee."; createdAt = 1718097331000000000 },
    ];

    for (review in reviewData.values()) {
      reviews.add(review.id, review);
    };
  };

  // Init
  public func _init() : async () {
    initProducts();
    initReviews();
  };

  // Functions
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func getCart(sessionId : Text) : async [CartItem] {
    switch (carts.get(sessionId)) {
      case (?items) { items.toArray() };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func addToCart(sessionId : Text, productId : Nat, quantity : Nat) : async Bool {
    if (quantity == 0) { return false };
    if (not products.containsKey(productId)) { return false };

    let cart = switch (carts.get(sessionId)) {
      case (?items) { items };
      case (null) { List.empty<CartItem>() };
    };

    var itemExists = false;
    let newCart = cart.map<CartItem, CartItem>(
      func(item) {
        if (item.productId == productId) {
          itemExists := true;
          { productId; quantity };
        } else {
          item;
        };
      }
    );

    if (not itemExists) {
      newCart.add({ productId; quantity });
    };

    carts.add(sessionId, newCart);
    true;
  };

  public shared ({ caller }) func removeFromCart(sessionId : Text, productId : Nat) : async Bool {
    switch (carts.get(sessionId)) {
      case (null) { false };
      case (?items) {
        let filtered = items.filter(
          func(item) { item.productId != productId }
        );
        carts.add(sessionId, filtered);
        true;
      };
    };
  };

  public shared ({ caller }) func updateCartQuantity(sessionId : Text, productId : Nat, quantity : Nat) : async Bool {
    if (quantity == 0) { return false };
    switch (carts.get(sessionId)) {
      case (null) { false };
      case (?items) {
        let mapped = items.map<CartItem, CartItem>(
          func(item) {
            if (item.productId == productId) {
              { productId; quantity };
            } else {
              item;
            };
          }
        );
        carts.add(sessionId, mapped);
        true;
      };
    };
  };

  public shared ({ caller }) func clearCart(sessionId : Text) : async Bool {
    carts.remove(sessionId);
    true;
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.values().toArray();
  };

  public shared ({ caller }) func addReview(productName : Text, customerName : Text, rating : Nat, comment : Text) : async Review {
    if (rating < 1 or rating > 5) { Runtime.trap("Invalid rating") };

    let review : Review = {
      id = nextReviewId;
      productName;
      customerName;
      rating;
      comment;
      createdAt = Time.now();
    };

    reviews.add(nextReviewId, review);
    nextReviewId += 1;
    review;
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : Text, message : Text) : async ContactSubmission {
    let contact : ContactSubmission = {
      id = nextContactId;
      name;
      email;
      phone;
      message;
      createdAt = Time.now();
    };

    contactSubmissions.add(nextContactId, contact);
    nextContactId += 1;
    contact;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };
};
