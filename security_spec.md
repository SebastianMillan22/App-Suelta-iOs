# Security Specification: Suelta y Sana

## 1. Data Invariants
- Each user can only read, create, update, or delete their own user profile document (`/users/{userId}`).
- Each user can only read, create, update, or delete diary entries under their own subcollection (`/users/{userId}/diario/{entradaId}`).
- An entry cannot be created or updated with a mismatched parent reference.
- Diary entry document IDs must be valid alphanumeric strings.

## 2. Test Payloads ("Dirty Dozen")
1. Read profile of another user (Denied)
2. Create user profile with spoofed UID (Denied)
3. Modify another user's profile document (Denied)
4. Read diary entries of another user (Denied)
5. Create a diary entry in another user's subcollection (Denied)
6. Write a diary entry with a massive payload (Denied)
7. Inject malicious chars into a diary document ID (Denied)
8. Update a diary entry with a mismatched user id (Denied)
9. Delete another user's diary entry (Denied)
10. Retrieve blanket list of all users' profiles (Denied)
11. Retrieve blanket list of all diary entries across users (Denied)
12. Create a user profile with unverified email if verification is required (Denied)
