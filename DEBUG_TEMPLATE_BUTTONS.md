# 🐛 Template Edit/Delete Button Debugging Guide

## ✅ What I Fixed

### 1. **Delete Button Functionality**
- Added clear error message when trying to delete default templates
- Error shows for 3 seconds when clicking delete on default templates
- Custom templates delete immediately

### 2. **Update Button Functionality**
- Added extensive console logging to track the update flow
- Logs show in Metro bundler console

### 3. **Console Logging Added**
All operations now log to help debug:
- When edit button is clicked
- When template is being saved/updated
- When delete is called
- Context state changes

---

## 🧪 How to Test

### **Test 1: Create a Custom Template**

1. Open Add Task modal (tap + button)
2. Click green "+ Create Template" button
3. Fill in:
   - Name: "My Test Template"
   - Icon: "🎯"
   - Add task: "Test task" at "09:00"
4. Click "Save Template"
5. **Check console**: Should see "Creating new template"

### **Test 2: Edit Custom Template**

1. Find your custom template in the grid
2. Click the **blue edit button (✏️)**
3. **Check console**: Should see:
   ```
   Edit template clicked: My Test Template isDefault: false id: custom_xxxxx
   Custom template - editing existing, id: custom_xxxxx
   ```
4. Change the name to "My Updated Template"
5. Click "Update Template"
6. **Check console**: Should see:
   ```
   Saving template - editingTemplateId: custom_xxxxx
   Updating template: custom_xxxxx
   TemplatesContext: updateTemplate called with id: custom_xxxxx
   ```
7. **Verify**: Template name should be updated in the grid

### **Test 3: Delete Custom Template**

1. Find your custom template
2. Click the **red delete button (✖)**
3. **Check console**: Should see:
   ```
   TemplatesContext: deleteTemplate called with id: custom_xxxxx
   TemplatesContext: After delete: [...]
   ```
4. **Verify**: Template disappears from the grid immediately

### **Test 4: Try to Delete Default Template**

1. Find any default template (Daily Routine, Work Day, etc.)
2. Click the **red delete button (✖)**
3. **Check**: Error message appears at bottom:
   ```
   "Cannot delete default templates. You can only delete custom templates."
   ```
4. Message disappears after 3 seconds
5. Template remains in the grid

### **Test 5: Edit Default Template (Creates Copy)**

1. Find a default template (e.g., "Daily Routine")
2. Click the **blue edit button (✏️)**
3. **Check console**: Should see:
   ```
   Edit template clicked: Daily Routine isDefault: true id: daily_routine
   Default template - creating copy
   ```
4. **Check modal**: Title says "Create Custom Template"
5. **Check name field**: Shows "Daily Routine (Copy)"
6. Click "Save Template"
7. **Verify**: New custom template created with "(Copy)" suffix

---

## 🔍 Console Output Guide

### **Successful Update Flow:**
```
Edit template clicked: My Template isDefault: false id: custom_abc123
Custom template - editing existing, id: custom_abc123
Saving template - editingTemplateId: custom_abc123
Updating template: custom_abc123
TemplatesContext: updateTemplate called with id: custom_abc123 updates: {...}
TemplatesContext: Updated templates: [...]
```

### **Successful Delete Flow:**
```
TemplatesContext: deleteTemplate called with id: custom_abc123
TemplatesContext: After delete: [...]
```

### **Default Template Edit (Copy) Flow:**
```
Edit template clicked: Daily Routine isDefault: true id: daily_routine
Default template - creating copy
Saving template - editingTemplateId: null
Creating new template
```

---

## ❌ Troubleshooting

### **Problem: Update Creates New Template Instead**

**Symptoms:**
- Click edit on custom template
- Make changes
- Template duplicates instead of updating

**Check:**
1. Open Metro bundler console
2. Look for: "Custom template - editing existing, id: [ID]"
3. If you see "Default template - creating copy" → You clicked a default template
4. Check if `editingTemplateId` is null in "Saving template" log

**Solution:**
- Make sure you created a CUSTOM template first
- Default templates (Daily Routine, Work Day, etc.) always create copies

### **Problem: Delete Button Does Nothing**

**Symptoms:**
- Click delete button
- Nothing happens
- No error message

**Check:**
1. Open Metro bundler console
2. Look for: "Cannot delete default template" or delete logs
3. Check if template has green border (custom) or white border (default)

**Solution:**
- You're trying to delete a default template
- Delete only works on custom templates (green border)
- Error message should appear for 3 seconds

### **Problem: Buttons Not Visible**

**Symptoms:**
- Can't see edit/delete buttons

**Check:**
1. Both buttons should be visible in top-right corner of EVERY template
2. Edit button: Blue circle with ✏️
3. Delete button: Red circle with ✖
4. Size: 24x24px each

**Solution:**
- Restart the app
- Clear Metro cache: `npm start -- --reset-cache`

---

## 📝 Expected Behavior Summary

| Template Type | Edit Button | Delete Button |
|--------------|-------------|---------------|
| **Default** (Daily Routine, etc.) | ✏️ Creates copy | ✖ Shows error |
| **Custom** (Your templates) | ✏️ Updates existing | ✖ Deletes immediately |

---

## 🎯 Quick Verification Checklist

- [ ] Created a custom template successfully
- [ ] Edit button visible on all templates
- [ ] Delete button visible on all templates  
- [ ] Editing custom template updates it (check name changes)
- [ ] Deleting custom template removes it
- [ ] Deleting default template shows error
- [ ] Editing default template creates copy with "(Copy)" suffix
- [ ] Console logs show correct flow

---

## 📞 Still Having Issues?

Check Metro bundler console output and compare with expected flows above.

**All operations are logged, so you can trace exactly what's happening!**
