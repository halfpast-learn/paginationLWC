public with sharing class accountLoader {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList()
    {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String filterString){
        List<List<Account>> result = [FIND :filterString IN ALL FIELDS RETURNING Account(Id,Name)];
        Account[] searchAccounts = (Account[])result[0];
        return searchAccounts;
    }
}
