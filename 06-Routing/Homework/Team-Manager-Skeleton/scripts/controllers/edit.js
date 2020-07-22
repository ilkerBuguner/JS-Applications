import {getTeamById} from '../data.js';
import {editTeam} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        editForm: await this.load('./templates/edit/editForm.hbs')
    }
    const data = await getTeamById(this.params.id);
    Object.assign(data, this.app.userData)
    this.partial('./templates/edit/editPage.hbs', data);
}

export async function editPost() {
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment
    };

    if(Object.values(newTeam).some(v => v.length == 0)) {
        alert('All fields are required!');
        return;
    }

    try {
        const result = await editTeam(newTeam, this.params.id);
        if(result.hasOwnProperty('errorData')) {
            const err = Error();
            Object.assign(err, result);
            throw err;
        }

        this.redirect(`#/catalog/${result.objectId}`);
    } catch(err) {
        console.error(err);
        alert(err.message);
    }
}