window.addEventListener('load', async () => {
    const appId = 'A2BB1110-8740-5501-FFC2-0CEEE4DD6700';
    const apiKey = '9D4709EF-1BAA-4AA4-BFB0-398A156EBE60';

    function host(endpoint) {
        return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
    }
    
    const tbody = document.querySelector('tbody');
    const response = await fetch(host('students'));
    const students = await response.json();

    students.sort((a, b) => a.ID - b.ID).forEach(student => {
        const grade = (student.Grade).toString();
        const studentEl = el('tr', [
            el('td', (student.ID).toString()),
            el('td', student.FirstName),
            el('td', student.LastName),
            el('td', student.FacultyNumber),
            el('td', (student.Grade).toString())
        ]);

        tbody.appendChild(studentEl);
    });


    function el(type, content, attributes) {
        const result = document.createElement(type);
    
        if (attributes !== undefined) {
          Object.assign(result, attributes);
        }
    
        if (Array.isArray(content)) {
          content.forEach(append);
        } else {
          append(content);
        }
    
        function append(node) {
          if (typeof node === 'string') {
            node = document.createTextNode(node);
          }
          result.appendChild(node);
        }
    
        return result;
      }
})