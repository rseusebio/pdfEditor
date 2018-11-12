export default class Book {
    constructor(id, pages, name) {
        this.id = id;
        this.pages = pages;
        this.name = name;
        this.currentPage = 1;
    }

    setCurrentPage(page) {
        if (typeof page == 'number') {
            if (page >= 1) {
                this.currentPage = page;
            }

        }
    }

    setPages(pages) {
        if (typeof pages == 'number') {
            if (pages >= 1) {
                this.pages = pages;
            }

        }
    }

    setName(name) {
        if (typeof name == 'string') {
            if(name != ''){
                this.name = name;
            }

        }
    }

    setId(id) {
        if (typeof id == 'number') {
            if (id >= 1) {
                this.id = id;
            }
        }
    }
}