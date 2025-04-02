export const signUp = async (req,res) => {
    const { email, password } = req.body;
    if (!email ||!password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });
      const token = await jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ message: "User registered", token, newUser });
    } catch (err) {
  
      res.status(400).json({ error: err.message });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ message: "User logged-In", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}