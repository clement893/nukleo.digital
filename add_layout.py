import re

pages = ['About', 'Expertise', 'Resources', 'FAQ', 'Contact', 'Projects']

for page in pages:
    filepath = f'client/src/pages/{page}.tsx'
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Ajouter l'import de PageLayout après les imports existants
    if 'PageLayout' not in content:
        # Trouver la dernière ligne d'import
        import_lines = [line for line in content.split('\n') if line.startswith('import')]
        if import_lines:
            last_import = import_lines[-1]
            content = content.replace(last_import, last_import + "\nimport PageLayout from '@/components/PageLayout';", 1)
    
    # Wrapper le contenu dans PageLayout
    # Trouver le return statement
    pattern = r'(export default function \w+\([^)]*\) \{[\s\S]*?return \()'
    match = re.search(pattern, content)
    if match:
        # Ajouter PageLayout après le return (
        content = re.sub(pattern, r'\1\n    <PageLayout>', content, 1)
        
        # Trouver la dernière fermeture avant la fin de la fonction
        # Chercher );} à la fin
        content = re.sub(r'\n  \);\n\}$', '\n    </PageLayout>\n  );\n}', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f'Updated {page}.tsx')

print('Done!')
