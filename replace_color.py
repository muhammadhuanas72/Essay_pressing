with open('src/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace light theme accent variable declaration
old_light_accent = '  --accent: #2563EB;'
new_light_accent = '  --accent-rgb: 26, 123, 143;\n  --accent: rgb(var(--accent-rgb));'
content = content.replace(old_light_accent, new_light_accent)

# Replace dark theme accent variable declaration
old_dark_accent = '  --accent: #3B82F6;'
new_dark_accent = '  --accent-rgb: 38, 165, 189;\n  --accent: rgb(var(--accent-rgb));'
content = content.replace(old_dark_accent, new_dark_accent)

# Replace all instances of rgba(37, 99, 235, ...) with rgba(var(--accent-rgb), ...)
content = content.replace('37, 99, 235', 'var(--accent-rgb)')
content = content.replace('37,99,235', 'var(--accent-rgb)')

# Replace other instances of the old accent colors with the var(--accent) CSS variable
content = content.replace('#2563EB', 'var(--accent)')
content = content.replace('#2563eb', 'var(--accent)')
content = content.replace('#3B82F6', 'var(--accent)')
content = content.replace('#3b82f6', 'var(--accent)')

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Colors replaced successfully.")
