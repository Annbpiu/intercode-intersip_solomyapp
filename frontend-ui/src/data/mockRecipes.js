export const mockRecipes = [
    {
        id: '1',
        title: 'Classic Margherita Pizza',
        content: 'A traditional Italian pizza with fresh mozzarella, basil, and tomato sauce. This simple yet delicious recipe showcases the perfect balance of flavors that has made Margherita pizza a worldwide favorite.',
        ingredients: [
            { name: 'Pizza dough', amount: '1', unit: 'ball' },
            { name: 'Fresh mozzarella', amount: '200', unit: 'g' },
            { name: 'Fresh basil leaves', amount: '10-12', unit: 'leaves' },
            { name: 'Tomato sauce', amount: '1/2', unit: 'cup' },
            { name: 'Olive oil', amount: '2', unit: 'tbsp' },
            { name: 'Salt', amount: '1/2', unit: 'tsp' }
        ],
        authorId: 'user1',
        author: { email: 'test@example.com', id: 'user1' },
        createdAt: '2024-01-15T10:30:00Z',
        cookingTime: 25,
        servings: 4,
        difficulty: 'medium'
    },
    {
        id: '2',
        title: 'Chocolate Chip Cookies',
        content: 'Soft and chewy chocolate chip cookies with crispy edges. These classic cookies are perfect for any occasion and will fill your home with the wonderful aroma of freshly baked cookies.',
        ingredients: [
            { name: 'All-purpose flour', amount: '2 1/4', unit: 'cups' },
            { name: 'Butter', amount: '1', unit: 'cup' },
            { name: 'Brown sugar', amount: '3/4', unit: 'cup' },
            { name: 'White sugar', amount: '3/4', unit: 'cup' },
            { name: 'Eggs', amount: '2', unit: 'large' },
            { name: 'Vanilla extract', amount: '1', unit: 'tsp' },
            { name: 'Chocolate chips', amount: '2', unit: 'cups' },
            { name: 'Baking soda', amount: '1', unit: 'tsp' },
            { name: 'Salt', amount: '1/2', unit: 'tsp' }
        ],
        authorId: 'user2',
        author: { email: 'baker.sarah@example.com', id: 'user2' },
        createdAt: '2024-01-20T14:15:00Z',
        cookingTime: 15,
        servings: 24,
        difficulty: 'easy'
    },
    {
        id: '3',
        title: 'Beef Stir Fry',
        content: 'A quick and flavorful beef stir fry with colorful vegetables. This dish is perfect for busy weeknights and can be customized with your favorite vegetables and sauces.',
        ingredients: [
            { name: 'Beef sirloin', amount: '500', unit: 'g' },
            { name: 'Broccoli', amount: '2', unit: 'cups' },
            { name: 'Bell peppers', amount: '2', unit: 'medium' },
            { name: 'Soy sauce', amount: '3', unit: 'tbsp' },
            { name: 'Garlic', amount: '4', unit: 'cloves' },
            { name: 'Ginger', amount: '1', unit: 'tbsp' },
            { name: 'Vegetable oil', amount: '2', unit: 'tbsp' },
            { name: 'Cornstarch', amount: '1', unit: 'tbsp' }
        ],
        authorId: 'user3',
        author: { email: 'chef.wei@example.com', id: 'user3' },
        createdAt: '2024-01-25T18:45:00Z',
        cookingTime: 20,
        servings: 4,
        difficulty: 'medium'
    },
    {
        id: '4',
        title: 'French Onion Soup',
        content: 'A rich and comforting French onion soup with caramelized onions, beef broth, and melted Gruyère cheese. This classic soup is perfect for cold winter days and special occasions.',
        ingredients: [
            { name: 'Yellow onions', amount: '6', unit: 'large' },
            { name: 'Beef broth', amount: '8', unit: 'cups' },
            { name: 'Butter', amount: '4', unit: 'tbsp' },
            { name: 'Gruyère cheese', amount: '200', unit: 'g' },
            { name: 'Baguette', amount: '1', unit: 'loaf' },
            { name: 'White wine', amount: '1/2', unit: 'cup' },
            { name: 'Thyme', amount: '1', unit: 'tsp' },
            { name: 'Bay leaves', amount: '2', unit: 'leaves' }
        ],
        authorId: 'user4',
        author: { email: 'chef.pierre@example.com', id: 'user4' },
        createdAt: '2024-01-30T12:20:00Z',
        cookingTime: 90,
        servings: 6,
        difficulty: 'hard'
    },
    {
        id: '5',
        title: 'Avocado Toast',
        content: 'A simple and nutritious breakfast option featuring creamy avocado on toasted bread. Customize with your favorite toppings like eggs, tomatoes, or microgreens for a satisfying morning meal.',
        ingredients: [
            { name: 'Bread', amount: '2', unit: 'slices' },
            { name: 'Ripe avocado', amount: '1', unit: 'medium' },
            { name: 'Lemon juice', amount: '1/2', unit: 'lemon' },
            { name: 'Red pepper flakes', amount: '1/4', unit: 'tsp' },
            { name: 'Salt', amount: '1/4', unit: 'tsp' },
            { name: 'Black pepper', amount: '1/4', unit: 'tsp' },
            { name: 'Olive oil', amount: '1', unit: 'tbsp' }
        ],
        authorId: 'user5',
        author: { email: 'health.lisa@example.com', id: 'user5' },
        createdAt: '2024-02-05T08:00:00Z',
        cookingTime: 10,
        servings: 1,
        difficulty: 'easy'
    },
    {
        id: '6',
        title: 'Chicken Tikka Masala',
        content: 'A creamy and aromatic Indian curry dish featuring tender chicken in a rich tomato-based sauce. This popular dish combines the perfect blend of spices with a smooth, creamy texture.',
        ingredients: [
            { name: 'Chicken breast', amount: '600', unit: 'g' },
            { name: 'Yogurt', amount: '1', unit: 'cup' },
            { name: 'Tomato puree', amount: '400', unit: 'ml' },
            { name: 'Heavy cream', amount: '1', unit: 'cup' },
            { name: 'Onion', amount: '1', unit: 'large' },
            { name: 'Garlic', amount: '6', unit: 'cloves' },
            { name: 'Ginger', amount: '2', unit: 'tbsp' },
            { name: 'Garam masala', amount: '2', unit: 'tsp' },
            { name: 'Turmeric', amount: '1', unit: 'tsp' },
            { name: 'Cumin', amount: '1', unit: 'tsp' }
        ],
        authorId: 'user6',
        author: { name: 'Chef Raj', id: 'user6' },
        createdAt: '2024-02-10T19:30:00Z',
        cookingTime: 45,
        servings: 6,
        difficulty: 'medium'
    },
    {
        id: '7',
        title: 'Caesar Salad',
        content: 'A classic Caesar salad with crisp romaine lettuce, parmesan cheese, croutons, and a creamy dressing. This timeless salad is perfect as a starter or light main course.',
        ingredients: [
            { name: 'Romaine lettuce', amount: '2', unit: 'heads' },
            { name: 'Parmesan cheese', amount: '1/2', unit: 'cup' },
            { name: 'Croutons', amount: '1', unit: 'cup' },
            { name: 'Lemon juice', amount: '2', unit: 'tbsp' },
            { name: 'Garlic', amount: '2', unit: 'cloves' },
            { name: 'Anchovy paste', amount: '1', unit: 'tsp' },
            { name: 'Dijon mustard', amount: '1', unit: 'tsp' },
            { name: 'Olive oil', amount: '1/4', unit: 'cup' }
        ],
        authorId: 'user7',
        author: { email: 'chef.maria@example.com', id: 'user7' },
        createdAt: '2024-02-15T11:45:00Z',
        cookingTime: 15,
        servings: 4,
        difficulty: 'easy'
    },
    {
        id: '8',
        title: 'Beef Tacos',
        content: 'Flavorful beef tacos with seasoned ground beef, fresh vegetables, and homemade salsa. These tacos are perfect for family dinners and can be customized with your favorite toppings.',
        ingredients: [
            { name: 'Ground beef', amount: '500', unit: 'g' },
            { name: 'Taco seasoning', amount: '2', unit: 'tbsp' },
            { name: 'Taco shells', amount: '12', unit: 'pieces' },
            { name: 'Lettuce', amount: '1', unit: 'head' },
            { name: 'Tomatoes', amount: '3', unit: 'medium' },
            { name: 'Onion', amount: '1', unit: 'medium' },
            { name: 'Cheddar cheese', amount: '200', unit: 'g' },
            { name: 'Sour cream', amount: '1/2', unit: 'cup' }
        ],
        authorId: 'user8',
        author: { email: 'chef.carlos@example.com', id: 'user8' },
        createdAt: '2024-02-20T16:30:00Z',
        cookingTime: 25,
        servings: 6,
        difficulty: 'easy'
    },
    {
        id: '9',
        title: 'Pasta Carbonara',
        content: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper. This simple yet delicious recipe creates a creamy sauce without using cream.',
        ingredients: [
            { name: 'Spaghetti', amount: '400', unit: 'g' },
            { name: 'Pancetta', amount: '150', unit: 'g' },
            { name: 'Eggs', amount: '4', unit: 'large' },
            { name: 'Parmesan cheese', amount: '100', unit: 'g' },
            { name: 'Black pepper', amount: '1', unit: 'tsp' },
            { name: 'Salt', amount: '1', unit: 'tsp' },
            { name: 'Olive oil', amount: '2', unit: 'tbsp' }
        ],
        authorId: 'user9',
        author: { email: 'chef.giuseppe@example.com', id: 'user9' },
        createdAt: '2024-02-25T13:15:00Z',
        cookingTime: 20,
        servings: 4,
        difficulty: 'medium'
    },
    {
        id: '10',
        title: 'Chocolate Lava Cake',
        content: 'Individual chocolate cakes with a molten chocolate center. These elegant desserts are perfect for special occasions and can be prepared in advance.',
        ingredients: [
            { name: 'Dark chocolate', amount: '200', unit: 'g' },
            { name: 'Butter', amount: '100', unit: 'g' },
            { name: 'Eggs', amount: '3', unit: 'large' },
            { name: 'Sugar', amount: '100', unit: 'g' },
            { name: 'All-purpose flour', amount: '60', unit: 'g' },
            { name: 'Vanilla extract', amount: '1', unit: 'tsp' },
            { name: 'Salt', amount: '1/4', unit: 'tsp' }
        ],
        authorId: 'user10',
        author: { email: 'pastry.chef@example.com', id: 'user10' },
        createdAt: '2024-03-01T20:00:00Z',
        cookingTime: 12,
        servings: 4,
        difficulty: 'hard'
    },
    {
        id: '11',
        title: 'Grilled Salmon',
        content: 'Perfectly grilled salmon fillets with herbs and lemon. This healthy dish is quick to prepare and packed with omega-3 fatty acids.',
        ingredients: [
            { name: 'Salmon fillets', amount: '4', unit: 'pieces' },
            { name: 'Lemon', amount: '2', unit: 'medium' },
            { name: 'Fresh dill', amount: '1/4', unit: 'cup' },
            { name: 'Olive oil', amount: '3', unit: 'tbsp' },
            { name: 'Garlic', amount: '3', unit: 'cloves' },
            { name: 'Salt', amount: '1', unit: 'tsp' },
            { name: 'Black pepper', amount: '1', unit: 'tsp' }
        ],
        authorId: 'user11',
        author: { email: 'chef.anna@example.com', id: 'user11' },
        createdAt: '2024-03-05T18:45:00Z',
        cookingTime: 15,
        servings: 4,
        difficulty: 'medium'
    },
    {
        id: '12',
        title: 'Vegetable Curry',
        content: 'A hearty vegetable curry with chickpeas, potatoes, and aromatic spices. This vegetarian dish is both nutritious and flavorful.',
        ingredients: [
            { name: 'Chickpeas', amount: '400', unit: 'g' },
            { name: 'Potatoes', amount: '3', unit: 'medium' },
            { name: 'Carrots', amount: '3', unit: 'medium' },
            { name: 'Onion', amount: '1', unit: 'large' },
            { name: 'Coconut milk', amount: '400', unit: 'ml' },
            { name: 'Curry powder', amount: '2', unit: 'tbsp' },
            { name: 'Turmeric', amount: '1', unit: 'tsp' },
            { name: 'Ginger', amount: '1', unit: 'tbsp' }
        ],
        authorId: 'user12',
        author: { email: 'chef.priya@example.com', id: 'user12' },
        createdAt: '2024-03-10T12:30:00Z',
        cookingTime: 35,
        servings: 6,
        difficulty: 'medium'
    }
];
