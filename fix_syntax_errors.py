import re, os

files = [
    'src/features/admin/containers/components/LoadingSequenceItem.styles.ts',
    'src/features/admin/containers/components/WaypointModalHeader.tsx',
    'src/features/admin/containers/screens/CreateContainer/CreateContainerScreen.styles.ts',
    'src/features/admin/goods/components/VoidGoodsListItem/VoidGoodsListItem.styles.ts',
    'src/features/admin/orders/components/ActiveOrderHeaderCard/ActiveOrderHeaderCard.styles.ts',
    'src/features/customer/containers/components/ContainerCard/ContainerCard.styles.ts',
    'src/features/customer/containers/components/ETACard/ETACard.styles.ts',
    'src/features/stats/screens/components/PaymentOverview.styles.ts',
]

# Fix patterns like: backgroundColor: 'Theme.colors.xxx + 'xx''
# Should be: backgroundColor: Theme.colors.xxx + 'xx'
pattern = re.compile(r"(['\"])Theme\.colors\.([a-z]+)\.([a-z]+) \+ '([0-9a-fA-F]+)'\1")

for f in files:
    if not os.path.exists(f):
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    new_content = pattern.sub(r"Theme.colors.\2.\3 + '\4'", content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        print(f'FIXED: {f}')
    else:
        print(f'NO CHANGES: {f}')
