public with sharing class accountLoader {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList()
    {
        return [SELECT Id, Name FROM Account LIMIT 5];
    }
}
