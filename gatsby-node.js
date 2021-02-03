const path = require("path");

exports.onCreatePage = async({ page, actions }) => {
    const { createPage } = actions;

    if (page.path.match(/^\/admin/)) {
        page.matchPath = "/admin/*";

        createPage(page);
    }
}
