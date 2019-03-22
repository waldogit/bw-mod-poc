# Explore gql-modules and opportunities for cross UBC client cache reuse

## Goals:

### Server:

do an experiment to find the most effective way to organise gql modules.

#### in scope: 
* what is a good dividing principle to break up the logic?
#### out of scope: 
* how to overcome particular quircks in particular APIs?

### Client:
* leverage apollo's code generation facilities to
    - have a typesafe GQL payload with little manual coding
    - have boilerplate free application code to interact with the GQL server
* reuse types and cached transactional data accross domain teams

## Lessons Learned:
### Dividing principle
The dividing principle used is: each individual GQL modules is focused to a single domain API. 
Rationale:
- domain api context (types, endpoints, error codes, etc) is in a single place
- modules have a natural dev team that 'stewards' it; other teams can make PRs, but domain dev team member(s) must approve
- modules can be more homogenuous: 
    - domains typically have a '_value_' aspect, which represent the transactional data which are externally visible
    - besides that, they typically have an '*entry*' aspect, that describes the meta level that is helpful in creating and validating transactional values. This part is typically internal to the domain. The distinction between these 2 aspects can be reflected in folder structure, file names and schema.
- This organisation along the underlying domain API has no implications whatsoever on the schema, which can still be oriented towards user tasks, due to the way the modules can be stacked to a single schema.

At some point you will need to join data from different domains. I think that should NOT be done in one of the mentioned (*domain specific*) modules, but in a separate *combination* module, which over time might be subdivided. Combination modules are not in scope of this POC.

### Code generation
Type safety and service generation are great productivity boosters, and help keep the client code succinct and maintainable.

### Cache reuse
More than just type safety, the aspect of *cache reuse* is where GQL as a data aggregation layer shows its true potential. By mapping all traffic through a shared schema, expressing navigation / manipulation in a shared cache can be unambiguous. This is a great way to combine a progressive user oriented page interaction with optimally tuned and aggregated data traffic. 
That said, to allow the result of a mutation to be reused in a subsequent query, at present does require manual coding to properly set the cache. The succinct interaction we enjoy due to the code generation, makes the contrast with the verbosity of updating the cache even greater. But code generation is a new feature which is likely to be improved in the near future.

### Page load waits
Cache reuse is great for minimizing payload waits. I added a feature to delay some GQL traffic, which shows that page transitions can be virtually instantaneous, with '*late enhancing*' once the slow traffic comes in. This paves the way to phase out spinners and enhance the page transitions in our flow.

### Plain angular
I used plain angular and angular material, which play well with the 'late enhancing': no focus loss or page flutter. Instrumental here is to stay away from recreating the entire form but do minimal dynamic form changes i.e. via form array mutations.

# TODO:
- add the delay feature to other GQL entries
- give focus to the first field when opening a new accordion (and then we have zero a11y issues)
- add validation and see how watch queries and late form re-definitions complicate the form validity and UX.
- explore gql fragments and persisted queries to reduce (cache update) boilerplate
