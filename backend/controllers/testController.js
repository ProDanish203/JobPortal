export const testPost = (req, res) => {
    let { name } = req.body;
    res.status(200).send(`Name: ${name}`)
}
