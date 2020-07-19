export default async function() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    }

    const data = Object.assign({}, this.app.userData);

    data.teams = [
        {
            _id: '12412',
            name: 'nz',
            comment: 'test'
        },
        {
            _id: '12312',
            name: 'das',
            comment: 'test2'
        },
        {
            _id: '21312',
            name: 'nasfasz',
            comment: 'test3'
        }
    ]
    this.partial('./templates/catalog/teamCatalog.hbs', data);
}